from django import forms
from .models import Fundraiser

class FundraiserForm(forms.ModelForm):
    class Meta:
        model = Fundraiser
        fields = ['title', 'description']