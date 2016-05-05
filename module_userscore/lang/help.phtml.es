
!if $special_parm!=$empty and $special_parm_!=$empty
 !changeto lang/help.$moduclass_lang/$special_parm.phtml
!endif

!read adm/title.phtml 1\
\
Niveles de severidad de las hojas de trabajo

!if $wims_user=supervisor
<p>
El servidor calcula dos medias para el trabajo de cada participante en
cada una de las hojas: un porcentaje de los puntos obtenidos con respecto al n�mero
de puntos requeridos y la calidad de los puntos obtenidos en los ejercicios
de la hoja. Sean `x' este porcentaje e `y' la calidad, ambos tendiendo por
proporcionalidad a valores entre 0 y 1. Las siguientes son las f�rmulas para
el c�lculo de las notas:
</p>

!reset table_center
$table_header
$table_hdtr<th>Nivel</th><th>F�rmula</th><th>Explicaci�n</th></tr>
$table_tr<td>0</td><td>$scoremax max(x,y)
 </td><td>Muy laxa: el m�ximo entre el porcentaje y la calidad.</td></tr>
$table_tr<td>1</td><td>$scoremax x
 </td><td>la calidad no se tiene en cuenta. Se logra la nota m�xima
 cuando se obtienen todos los puntos requeridos.</td></tr>
$table_tr<td>2</td><td>$scoremax x y<sup>0.3</sup>
 </td><td>La calidad tiene un efecto reducido sobre la nota.</td></tr>
$table_tr<td>3</td><td>$scoremax x y<sup>0.5</sup>
 </td><td>El efecto de la calidad es mayor.</td></tr>
$table_tr<td>4</td><td>$scoremax x y
 </td><td>Para tener una nota de $scoremax, debe lograr todos los puntos
  requeridos (el 100%) sin cometer errores (calidad=10).</td></tr>
$table_tr<td>5</td><td>$scoremax x<sup>2</sup> y
 </td><td>El porcentaje de trabajo no terminado est� sobrepenado.</td></tr>
$table_tr<td>6</td><td>$scoremax x<sup>2</sup> y<sup>2</sup>
 </td><td>Cualquier error est� sobrepenado.</td></tr>
$table_end

Remarque : En niveau 0 et 1, si la note de qualit� est
inf�rieure � 1 pour un exercice, le pourcentage de r�ussite (points obtenus)
est mis � 0% pour cet exercice lors du calcul de x ; si la note de qualit� est comprise entre 1 et 2,
le pourcentage de r�ussite pour cet exercice est divis� par 2 lors du calcul de x.

!else
Pour cette feuille, votre enseignant a choisi le mode de calcul suivant
de la note.
Pour chacun des indicateurs suivants, on calcule la moyenne pour votre travail pour :
<ul>
<li>
!if $help_sw=0
  le quotient I des points cumul�s par le nombre de points demand�s 10*n
!endif
!if $help_sw=1
la moyenne I des n meilleures notes,
!endif
!if $help_sw=2
 le minimum I des n meilleures notes
!endif
</li>
<li>
la qualit� Q des points obtenus sur les exercices.
</li>
</ul>

Si la note de qualit� est inf�rieure � 1 pour un exercice,
I est mis � 0 pour cet exercice  ;
si la note de qualit� est comprise entre 1 et 2,
I est divis� par 2 lors du calcul de la note de la feuille.

</p><p>
Ces moyennes sont ramen�es entre 0 et 1 et
 la note de la feuille est calcul�e comme
\($scoremax * $(list[$help_level+1;]) \)
!endif
