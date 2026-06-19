# Variables de Entorno

Las variables de entorno son variables globales que pueden ser accedidas por cualquier proceso en un sistema operativo. Estas variables contienen información sobre la configuración del sistema, como la ubicación de archivos, la configuración de red, el idioma del sistema, entre otros.

Para ver el valor de una variable de entorno en un sistema operativo basado en Unix, se puede utilizar el comando "echo" seguido del nombre de la variable de entorno. Por ejemplo, para ver el valor de la variable de entorno PATH, se puede ejecutar el siguiente comando:

```
echo $PATH
```

Para establecer el valor de una variable de entorno en un sistema operativo basado en Unix, se puede utilizar el comando "export" seguido del nombre de la variable y su valor. Por ejemplo, para establecer la variable de entorno MY_VAR con el valor "hello", se puede ejecutar el siguiente comando:

```
export MY_VAR=hello
```

Es importante tener en cuenta que las variables de entorno son temporales y se pierden al cerrar la sesión o reiniciar el sistema. Para hacer que una variable de entorno sea persistente, se puede agregar su definición en el archivo de configuración del shell correspondiente (por ejemplo, .bashrc para Bash).
