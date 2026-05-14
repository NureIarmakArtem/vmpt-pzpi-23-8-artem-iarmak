import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit
import java.util.Scanner

fun main() {
    val scanner = Scanner(System.`in`)
    println("Введіть цільову дату у форматі РРРР-ММ-ДД (наприклад, 2024-05-14):")
    
    val inputDate = scanner.nextLine()

    try {
        val startDate = LocalDateTime.of(-365, 5, 2, 11, 30)

        val targetDateStr = "$inputDate 12:00"
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")
        val endDate = LocalDateTime.parse(targetDateStr, formatter)

        val seconds = ChronoUnit.SECONDS.between(startDate, endDate)
        println("З 11:30 2.05.366 до н.е. до 12:00 $inputDate пройшло $seconds секунд.")
        
    } catch (e: Exception) {
        println("Помилка: Неправильний формат дати. Використовуйте формат РРРР-ММ-ДД.")
    }
}