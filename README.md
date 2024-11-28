# Detalles de la entrega

## Módulos a entregar
3) Introducción a los Lenguajes de Programación, Lógica de Programación
4) Gestión de Bases de Datos I
5) Desarrollo Lógico para Programación e Inteligencia Artificial y Programación
6) Lenguaje de Programación I

La entrega 3 y 6 se unificaron:
- La carpeta **client/** corresponde a la entrega 3 (El cliente con HTML, CSS)
- La carpeta **src/** corresponde al api REST, diseñada con node y express
- Se puede ejecutar:
  ```bash
  npm start
  ``` 

La entrega 4 se encuentra en la carpeta **DATA BASE** (**.psql)

La entrega 5 corresponde al archivo **list_Students.js**:
- Se puede ejecutar:
  ```bash
  npm run list
  ```

## IMPORTANTE

Cabe recalcar que el proyecto funciona con variables de entorno,
en caso de no hallarse tomaran los siguientes valores por defecto:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=myDB
```

Para cambiarlas se debe hacer lo siguiente:
1) En la raíz de este proyecto crear un archivo **``db.env``**
2) copiar el siguiente código anterior al archivo
3) reemplace los valores por los de su conexión a postgres

## Tener en cuenta
El archivo jsconfig.json se implemento para ayudar con la detección de errores tempranos,
por lo que puede ser removido en cuanto al uso de tipos complejos ya que podría dar errores difíciles de solucionar por el bajo nivel de tipado de JS