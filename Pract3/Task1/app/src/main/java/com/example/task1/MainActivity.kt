package com.example.task1

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.Period
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val etBirthDate = findViewById<EditText>(R.id.etBirthDate)
        val btnCalcAge = findViewById<Button>(R.id.btnCalcAge)
        val tvResult = findViewById<TextView>(R.id.tvAgeResult)

        btnCalcAge.setOnClickListener {
            try {
                val birthDate = LocalDate.parse(etBirthDate.text.toString())
                val age = Period.between(birthDate, LocalDate.now()).years
                tvResult.text = "Вам $age років"
            } catch (e: Exception) {
                tvResult.text = "Помилка формату дати!"
            }
        }
    }
}