import java.time.LocalDate
import java.time.Period
import java.time.format.DateTimeFormatter
import java.util.Scanner

fun main() {
    val scanner = Scanner(System.`in`)
    println("Введіть дату народження у форматі РРРР-ММ-ДД (наприклад, 2005-10-25):")
    
    val input = scanner.nextLine()

    try {
        val birthDate = LocalDate.parse(input, DateTimeFormatter.ISO_LOCAL_DATE)
        val currentDate = LocalDate.now()
        
        val age = Period.between(birthDate, currentDate).years
        println("Вам $age років.")
    } catch (e: Exception) {
        println("Помилка: Неправильний формат дати. Будь ласка, використовуйте формат РРРР-ММ-ДД.")
    }
}