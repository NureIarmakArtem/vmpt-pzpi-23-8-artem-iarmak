package com.example.task2

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val etTargetDate = findViewById<EditText>(R.id.etTargetDate)
        val btnCalc = findViewById<Button>(R.id.btnCalcSeconds)
        val tvResult = findViewById<TextView>(R.id.tvSecondsResult)

        btnCalc.setOnClickListener {
            try {
                val start = LocalDateTime.of(-365, 5, 2, 11, 30)
                val targetStr = "${etTargetDate.text} 12:00"
                val end = LocalDateTime.parse(targetStr, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"))

                val seconds = ChronoUnit.SECONDS.between(start, end)
                tvResult.text = "Минуло секунд: $seconds"
            } catch (e: Exception) {
                tvResult.text = "Введіть дату коректно!"
            }
        }
    }
}