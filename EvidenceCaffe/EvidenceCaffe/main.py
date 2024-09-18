import tkinter as tk
import requests
from tkinter import messagebox

def get_monthly_summary():
    month = entry.get()
    if month.isdigit() and 1 <= int(month) <= 12:
        url = f"http://ajax1.lmsoft.cz/procedure.php?cmd=getSummaryOfDrinks&month={month}"
        response = requests.post(url, auth=('coffee', 'kafe'))
        if response.status_code == 200:
            summary_data = response.json()
            result = ""
            for drink in summary_data:
                result += f"Typ: {drink[0]}, Uživatel: {drink[2]}, Počet: {drink[1]}\n"
            text_box.delete(1.0, tk.END)
            text_box.insert(tk.END, result)
        else:
            messagebox.showerror("Chyba", "Nepodařilo se načíst statistiky.")
    else:
        messagebox.showwarning("Chyba", "Zadejte platné číslo měsíce (1-12).")

app = tk.Tk()
app.title("Měsíční přehled")

label = tk.Label(app, text="Zadejte číslo měsíce (1-12):")
label.pack(pady=10)

entry = tk.Entry(app)
entry.pack(pady=5)

button = tk.Button(app, text="Zobrazit přehled", command=get_monthly_summary)
button.pack(pady=5)

text_box = tk.Text(app, height=10, width=50)
text_box.pack(pady=10)

app.mainloop()
