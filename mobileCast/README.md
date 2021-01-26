<p align="left">
    <img src="https://www.clipartkey.com/mpngs/m/152-1526970_imgenes-de-los-simpsons-png.png"/>
</p>

## Instalación de API Google Cast

```sh
npm install react-native-google-cast
```

### Configuraciones

<details>
<summary>Android</summary>

- Dentro de `android/app/src/main/AndroidManifest.xml` agregar:

```xml
<activity android:name="com.reactnative.googlecast.GoogleCastExpandedControlsActivity" />

<meta-data
    android:name="com.google.android.gms.cast.framework.OPTIONS_PROVIDER_CLASS_NAME"
    android:value="com.reactnative.googlecast.GoogleCastOptionsProvider" />
```

- Dentro de `android/app/build.gradle` agregar:

```xml
implementation "com.google.android.gms:play-services-cast-framework:+"
```

- Dentro de `android/app/src/main/java/com/cast/MainActivity.java` agregar:

```java
import com.facebook.react.GoogleCastActivity;

public class MainActivity extends GoogleCastActivity {
  // ..
}
```

IMPORTANTE: Es posible que debas utilizar un dispositivo fisico para emular la aplicación y pueda detectar el botón de Google Cast. Conecta tu dispositivo mobile vía USB y activa el modo debug para desarrollador. 

Independientemente de la manera en la que emules tu aplicación, inicia la app corriendo: 

```sh
eact-native start
```

```sh
react-native run-android
```
En el caso de que desees personalizar tu receiver: 


- Dentro de `android/app/src/main/AndroidManifest.xml` modifcar  `com.reactnative.googlecast.GoogleCastOptionsProvider` por `com.nativecast.CastOptionsProvider` como en el siguiente ejemplo:

```xml
<meta-data
    android:name="com.google.android.gms.cast.framework.OPTIONS_PROVIDER_CLASS_NAME"
    android:value="com.nativecast.CastOptionsProvider" />
```

- En el path `android/app/src/main/java/com/NOME-DO-APP` crear un archivo llamado `CastOptionsProvider.java` y agregue el siguiente código:

```java
package com.nativecast;

import com.reactnative.googlecast.GoogleCastOptionsProvider;
import android.content.Context;
import com.google.android.gms.cast.framework.CastOptions;

public class CastOptionsProvider extends GoogleCastOptionsProvider {
  @Override
  public CastOptions getCastOptions(Context context) {
    CastOptions castOptions = new CastOptions.Builder()
        .setReceiverApplicationId(context.getString(R.string.app_id))
        .build();
    return castOptions;
  }
}
```

- Para finalizar, ingrese al archivo `strings.xml` que se encuentra en `android/app/src/main/res/values/strings.xml` y agregue un nuevo string en `<resources>` con el ID de su app:

```xml
<string name="app_id">E038DH47</string>
```

</details>

### Links 
Para información más detallada sobre problemas de compatibilidad, usabilidad, APIs, consulte el repositorio oficial : [react-native-google-cast](https://github.com/react-native-google-cast/react-native-google-cast)

Qué necesitas para crear una Cast App: [App components](https://developers.google.com/cast/docs/developers#app_components)

Medios soportados por Google Cast: [Supported Media](https://developers.google.com/cast/docs/media)

Estilos de receiver:  [Styled Media Receiver](https://developers.google.com/cast/docs/styled_receiver)

[Google Cast SDK Developer Console](https://cast.google.com/publish)
