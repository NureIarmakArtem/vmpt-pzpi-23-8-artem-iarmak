package com.example.task_manager
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class MainActivity : AppCompatActivity() {

    private val tasks = mutableListOf<Task>()
    private lateinit var adapter: TaskAdapter
    private var taskIdCounter = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        tasks.add(Task(taskIdCounter++, "Перша задача", "Опис задачі"))

        val recyclerView: RecyclerView = findViewById(R.id.recyclerViewTasks)
        val btnAddTask: Button = findViewById(R.id.btnAddTask)

        adapter = TaskAdapter(
            tasks,
            onTaskClick = { task -> showTaskDetails(task) },
            onEditClick = { task -> showAddEditDialog(task) },
            onDeleteClick = { task ->
                tasks.remove(task)
                adapter.updateTasks(tasks)
                Toast.makeText(this, "Видалено", Toast.LENGTH_SHORT).show()
            },
            onCheckChange = { task, isChecked ->
                task.isCompleted = isChecked
            }
        )

        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = adapter

        btnAddTask.setOnClickListener {
            showAddEditDialog(null)
        }
    }

    private fun showAddEditDialog(taskToEdit: Task?) {
        val dialogView = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(50, 40, 50, 10)
        }

        val titleInput = EditText(this).apply {
            hint = "Назва"
            setText(taskToEdit?.title ?: "")
        }
        val descInput = EditText(this).apply {
            hint = "Опис"
            setText(taskToEdit?.description ?: "")
        }

        dialogView.addView(titleInput)
        dialogView.addView(descInput)

        val title = if (taskToEdit == null) "Нова задача" else "Редагувати"

        AlertDialog.Builder(this)
            .setTitle(title)
            .setView(dialogView)
            .setPositiveButton("Зберегти") { _, _ ->
                val t = titleInput.text.toString()
                val d = descInput.text.toString()

                if (t.isNotBlank()) {
                    if (taskToEdit == null) {
                        tasks.add(Task(taskIdCounter++, t, d))
                    } else {
                        taskToEdit.title = t
                        taskToEdit.description = d
                    }
                    adapter.updateTasks(tasks)
                } else {
                    Toast.makeText(this, "Помилка: пуста назва", Toast.LENGTH_SHORT).show()
                }
            }
            .setNegativeButton("Скасувати", null)
            .show()
    }

    private fun showTaskDetails(task: Task) {
        val status = if (task.isCompleted) "Виконано" else "Не виконано"
        AlertDialog.Builder(this)
            .setTitle(task.title)
            .setMessage("Опис: ${task.description}\nСтатус: $status")
            .setPositiveButton("ОК", null)
            .show()
    }
}