!set lang_exists=yes

!if $wims_read_parm!=
 !goto $wims_read_parm
!endif

!set name_donchoose=Choix des donn�es
!set name_studentloc=!nosubst $user_lastname $user_firstname
!set name_studentglo=!nosubst $wims_name_lastname $wims_name_firstname

!distribute line Media de la clase\
Media\
Media de las notas positivas\
Media global\
Group average\
into name_classAverage,name_Average,name_posAverage,name_globalaverage,\
name_groupAverage

!set name_partdeleted=Participantes borrados
!set wims_name_reg_ex=Lista de los ejercicios grabados
!!set name_transfer=Transferir sus actividades desde otras clases

!set name_minmax=m�n/media/m�x de la clase&nbsp;

!set name_manualscore=Notas asignadas por el profesor
!set name_autoscore=Notas registradas por el servidor
!set name_manual_notes=global,prof.,auto
!set name_examnote=Notas de ex�menes

!set name_severitylevels=Niveles de severidad de las hojas de trabajo
!set name_formula=N�mero,Peso,Nivel
!set name_sheetstatut=prep,activa,expirada,ocultada

!distribute items Examen,Hoja,Ejercicio,Comienzo,Puntuaci�n,Sesi�n,\
 Terminado&nbsp;,equiv.,Duration\
into name_Exam,name_Sheet,name_Exercise,name_Start,name_Score,name_Session,\
name_done,name_equiv,name_Duration

!set name_formula_comment=Puede definir los niveles de severidad y los pesos de las hojas de trabajo\
en la tabla siguiente. Las notas ser�n calculadas con un m�ximo =
!set name_formula2=!nosubst Notas calculadas sobre un m�ximo de $scoremax
!set name_pickup=Seleccione las hojas para <br />mostrar los resultados por hoja&nbsp;
!set name_warning= Ha efectuado una petici�n ilegal.

!set name_click=Pulse sobre un nombre para ver los detalles de su trabajo
!set name_affi=la calidad, el trabajo efectuado, las notas
!set name_workdetail=Detalles del trabajo de
!set name_activesession=Este participante tiene una sesi�n de examen activa&nbsp;

!distribute items Estaci�n de conexi�n, Tiempo restante, Sesi�n de examen de ,minutos\
into name_connecting,name_remaining_time,name_exam_session,name_minutes

!set name_noyetparticipant=Esta clase no tiene ning�n participante a�n.

!set name_warning_no_sequence=You have configured the sequence to be displayed but have not
added any sequences. Therefore no score can be displayed.

!if $manual>0
 !set name_manual_explanation=<b>Explicaciones.</b> En las columnas de <span class="tt">media</span>,\
<span class="tt">auto</span>  se refiere a la media
de las notas calculadas a partir de las puntuaciones obtenidas en las hojas de trabajo,\
 <span class="tt">prof.</span> se refiere a la media de las notas asignadas manualmente por el profesor.\
La nota <span class="tt">global</span> se calcula a partir de las otras dos, mediante la f�rmula
!endif

!set name_title_showsheet=!nosubst Detalles del trabajo sobre la hoja $numshowsheet<br />$sh_title
!set name_percentagegot=Porcentaje de los puntos obtenidos
!set name_qualitygot=Calidad del trabajo calculada sobre un m�ximo de 10
!set name_percentagedone=Porcentaje de trabajo efectuado
!set name_percentagebest=Average of the best required scores

!set name_post=mostrar
!set name_Post=Mostrar

!set name_sheetdetail=Click on the header of a column \
 to have a global view of all the results on all \
  the exercises of the corresponding sheet.

!if $job iswordof userprop teacher
  !distribute items Cambiar,N�mero de inscripci�n,Comentarios,URL de una fotograf�a,Variables (t�cnicas),\
  Contrase�a de la clase,Introduzca la contrase�a para la inscripci�n de participantes,\
  Login for external authentification,Inscription,Gestion,\
   Compulsory\
  into name_change,name_regnum,name_comments,name_photourl,name_vars,\
  name_classpassword,name_enterpassword,name_external_auth,name_inscript,name_gestion,\
  name_userprop_warning
  !goto end
!endif

!if $job=examcheck
 !set name_title_examcheck=!nosubst Detalles de los ex�menes hechos por $name_studentloc
 !set name_no_exampart=Este participante no ha realizado a�n ning�n examen.
 !set name_exampart=Sesiones de examen efectuadas por este participante (pulse sobre un \
  ejercicio para ver su contenido):
 !goto end
!endif
!if $job=getraw
  !set name_title_getraw=!nosubst Detalles del trabajo de $name_studentloc <br />(datos en bruto)
  !goto end
!endif

!set name_direct_score=lista y notas en directo

!if $job=csv
  !distribute lines  Este es el fichero\
    que puede descargar y abrir con su hoja de c�lculo\
    que pueden cargar a distancia y abrirse en su programa inform�tico hoja de c�lculo preferido.\
    Cambios en la informaci�n sobre los participantes\
    Nuevos participantes \
    La incorporaci�n de nuevos participantes ser� ignorada porque no queda espacio libre.\
    La informaci�n sobre los participantes no se ha modificado porque se han enviado calificaciones.\
    Se han ignorado en sus datos las notas calculadas por el servidor (medias y puntuaciones de hojas de trabajo/ex�menes) porque no pueden ser modificadas.\
    Datos ignorados relativos a los participantes borrados\
    Les noms de login suivants ne peuvent pas �tre ajout�s car le login est trop court\
    Los identificadores de usuario siguientes no existen y no pueden ser a�adidos a causa de errores o insuficiencia de informaci�n en los datos enviados\
    Los identificadores de usuario siguientes no existen y no pueden ser a�adidos a causa de errores o insuficiencia de informaci�n en los datos enviados\
    S�lo se graban calificaciones manuales para las columnas existentes.\
    No se ha producido ning�n cambio en los datos enviados con respecto a los datos existentes en la clase.\
    V�rifier les notes\
    Para $wims_name_download los datos de la clase en la hoja de c�lculo, especifique\
    El formato\
    Columnas\
    Para $wims_name_send los datos de su hoja de c�lculo a la clase, especifique\
    El fichero de datos\
    Formatos aceptados\
  into name_file,name_download,name_infochanged,name_added,name_warning1,name_warning2,\
  name_warning3,name_warning4,name_badlogin,name_nologin1,name_nologin2,name_manual1,name_data1,\
    name_check,name_data2,name_format,name_column,name_data3,name_data,name_format2


  !set name_deposit=!nosubst  El fichero de hoja de c�lculo <span class="tt">$wims_deposit</span> ha sido reconocido correctamente.
  !set name_indicateur=Indicator
  !set name_otherkeyword=Other keywords (technical variables)
  !set name_all=All
  !set name_allscore=All score
!endif

!set name_topten=!nosubst Top $class_topscores de las medias de la clase
:end
!exit

