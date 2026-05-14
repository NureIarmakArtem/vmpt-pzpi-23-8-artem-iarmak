from django.shortcuts import render, get_object_or_404, redirect
from .models import Organization, Fundraiser
from .forms import FundraiserForm

def org_list(request):
    organizations = Organization.objects.all()
    return render(request, 'ngo_app/org_list.html', {'organizations': organizations})

def org_detail(request, pk):
    org = get_object_or_404(Organization, pk=pk)
    return render(request, 'ngo_app/org_detail.html', {'org': org})

def fundraiser_create(request, org_pk):
    org = get_object_or_404(Organization, pk=org_pk)
    if request.method == 'POST':
        form = FundraiserForm(request.POST)
        if form.is_valid():
            fundraiser = form.save(commit=False)
            fundraiser.organization = org
            fundraiser.save()
            return redirect('org_detail', pk=org.pk)
    else:
        form = FundraiserForm()
    return render(request, 'ngo_app/fundraiser_form.html', {'form': form, 'org': org})

def fundraiser_update(request, pk):
    fundraiser = get_object_or_404(Fundraiser, pk=pk)
    if request.method == 'POST':
        form = FundraiserForm(request.POST, instance=fundraiser)
        if form.is_valid():
            form.save()
            return redirect('org_detail', pk=fundraiser.organization.pk)
    else:
        form = FundraiserForm(instance=fundraiser)
    return render(request, 'ngo_app/fundraiser_form.html', {'form': form})

def fundraiser_delete(request, pk):
    fundraiser = get_object_or_404(Fundraiser, pk=pk)
    org_pk = fundraiser.organization.pk
    if request.method == 'POST':
        fundraiser.delete()
        return redirect('org_detail', pk=org_pk)
    return render(request, 'ngo_app/fundraiser_confirm_delete.html', {'fundraiser': fundraiser})