# Сценарий 8: изменение заметки обновляет хранилище

## Шаги
1. Отобразить `NoteEditor` с выбранной заметкой.
2. Изменить значение текстового поля.
3. Дождаться задержки debounce.

## Ожидание
- `notesStore.updateContent` вызывается с новым значением.
