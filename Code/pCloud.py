from tkinter import *

#Create window
app = Tk()

#part
part_text = StringVar()
part_label = Label(app, text = '   Name:', font=('bold', 12), pady = 20)
part_label.grid(row=1, column=0, sticky = W)
part_entry = Entry(app,textvariable = part_text)
part_entry.grid(row=1,column=1)

#part2
part2_text = StringVar()
part2_label = Label(app, text = '   Passwort:', font=('bold', 12), pady = 20)
part2_label.grid(row=2, column=0, sticky = W)
part2_entry = Entry(app,textvariable = part_text)
part2_entry.grid(row=2,column=1)

#anmelden
part2_text = StringVar()
part2_label = Label(app, text = '   Anmelden.. junge', font=('bold', 12), pady = 20)
part2_label.grid(row=0, column=0, sticky = W)


app.title('pCloud    Anmelden')
app.geometry('350x250')
app.mainloop()