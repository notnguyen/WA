        window.addEventListener("DOMContentLoaded", (event) => {
             let menu = document.getElementById('menu');
             
             let links=[];
              links[0]='<li><a role="menuitem" class="nav-link  " href="https://moodle.spsejecna.cz/" tabindex="-1">Titulní stránka</a></li>';
                 links[1]='<li><a role="menuitem" class="nav-link  " href="https://moodle.spsejecna.cz/my/" tabindex="-1">Nástěnka</a></li>';
                 links[2]='<li><a role="menuitem" class="nav-link active " href="https://moodle.spsejecna.cz/my/courses.php" aria-current="true">Moje kurzy</a></li>';
                 links[3]='<li><a role="menuitem" class="nav-link  " href="https://moodle.spsejecna.cz/course/request.php" tabindex="-1">Požádat o kurz</a></li>';
                 links[4]='<li><a role="menuitem" class="nav-link  " href="https://oldmoodle.spsejecna.cz/" tabindex="-1">Starý Moodle</a></li>';
                 links[5]='<li><a href="#">Další</a></li>';
                    
                
             menu.innerHTML='<ul>';
             
             for(i=0;i<Math.random() * 10;i++)
                {
                menu.innerHTML+=links[i];
                }
                
             menu.innerHTML+='</ul>';
        
    }); //DOMContentLoaded   