---
title: C++
---
# Unterschiede zu C
## Kommentare
```cpp
// ein einzeiliger Kommentar

/*
ein
mehrzeiliger
Kommentar
*/
```

## Initialisierung
Zusätzliche Syntax bei Deklarationen, die verlustvolle Typenkonvertierung erkennt und explizite Zuweisung verhindert:

```cpp
int i = 7.2;   // warning ist generated, but compiles
int i { 7.2 }; // compile time error in C++
```

## Speicherverwaltung
Dynamische Speicherverwaltung ist Teil der Sprache mit Schlüsselwörtern `new` und `delete`
- für Arrays `new[]` und `delete[]`

```cpp
int* arr = new int[10];
delete[] arr;
```

## Primitive Datentypen
- `bool`: 1 Byte, `true` oder `false`
- `char`: 1 Byte
- `int`: 4 Bytes
	- mögliche Qualifizierer: `short`, `long`, `long long`
- `float`: 4 Bytes
- `double`: 8 Bytes
	- möglicher Qualifizierer: `long`

C++ ist statisch getypt (statically typed) $\Rightarrow$ Typen der Variablen müssen zur **Compilezeit** ermittelt werden
- wenn Ermittlung automatisch möglich ist, dann kann des Schlüsselwort `auto` verwendet werden

## Zeiger & Referenzen
Zeiger funktionieren genauso wie in C, Referenzen gibt es nur in C++

| Zeiger                                                                                          | Referenz                                                                                                              |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `T*` ist Zeiger auf ein Objekt des Typs `T`                                                     | `T&` ist Referenz auf ein Objekt des Typs `T`                                                                         |
| Kann beliebig zur Laufzeit verändert werden: Zeigerarithmetik und `&`-Operator                  | Kann zur Laufzeit nicht verändert werden                                                                              |
| `==`-Operator vergleicht Speicheradressen                                                       | `==`-Operator vergleicht referenzierte Objekte                                                                        |
| Inhalt des Speichers muss mit `*`-Operator gelesen (*rvalue*) und geschrieben (*lvalue*) werden | Inhalt des Speicher wird direkt mit dem Variablennamen gelesen (*rvalue*) und geschrieben (*lvalue*)                  |
| Muss nicht initialisiert werden                                                                 | **Muss** initialisiert werden                                                                                         |
| Belegt immer Speicherplatz, der Größe des Adressraums (z.B. 32 bit) entsprechend                | Belegt nicht notwendigerweise Speicherplatz (Compiler darf Referenz durch eigentlich referenzierte Variable ersetzen) |
