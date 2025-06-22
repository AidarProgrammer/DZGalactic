export const CalculateDay = function CalculateDay(numb) {
    const date = new Date(2024, 0, numb);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const months = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];
    return `${day} ${months[monthIndex]}`;
}