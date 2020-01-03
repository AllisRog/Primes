// Mise en place système. 
const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NjU0MjM4ODc3NDkzNDkzNzcw.XfCqEg.-XkwuQlG-4pbtX24RQtKUjW1DBE';
const PREFIX = '!';

// Liste des noms, primes, codes Discord et Equipages.  
Membres = [["ener", 273000, "443703085253132288", ""], ["zoro", 179000, "652940533253144579", ""],
["mihawk", 98000, "526048864919355392", ""], ["shanks", 728000, "342435810965979138", ""],
["chopper", 112000, "391581984956350465", ""],["sugar", 3, "654047627817779210", ""], 
["katakuri", 215000, "326811822726447115", ""],["bellamy", 25000, "404639144724398080", ""], 
["arlong", 0, "527604578506637332", ""],["edwardnewgate", 0, "469042136311136256", ""], 
["alvida", 50000, "653621701359173672", ""],["sanji", 75000, "653603212963741706", ""], 
["benbeckman", 58325, "480006189070155787", ""], ["pedro", 0, "269890311029915648", ""],
["usopp", 0, "573111845666291714", ""]];
Membres.sort(function(a,b){
    return b[1]-a[1]
});

// Liste des rôles pour les différentes primes. 
Roles = [["Esclave", "653974762590044162"], ["Brigand", "653625434285539358"], 
["Pirate", "653625269545992212"], ["Capitaine", "655349115827257344"], ["Super Nova", "653976486533136417"], 
["Corsaire", "653625135818866708"], ["Grand Corsaire", "653624948547387393"], ["Empereur", "653975929822904350"]]
Roles_index =["-999999999", "0", "100000", "250000", "500000", "1000000", "500000000", "1000000000"]
bot.on('ready', () =>{
    console.log("Le bot est connecté!");
})

// Fonction getBounty : Permet de générer une liste de toutes les primes (Bounty) des participants.
function getBounty(Membres) {
    var Liste_primes = "\nVoici la liste des primes : \n\n";
    for (let index = 0; index < Membres.length; index++) {
        Liste_primes += (index+1) + '. La prime de '+ Membres[index][0] + ' est de ' + Membres[index][1] + ' berrys.\n';
    }
    return Liste_primes;
}

// Fonction getPirates : Permet de générer une liste de tous les pirates. 
function getPirates(Membres) {
    var Liste = "";
    for (let index = 0; index < Membres.length; index++) {
        Liste += (index+1) + '. ' +  Membres[index][0] + '.\n';
    }
    return Liste;
}

function getCrew(Membres){
    var Liste_crew = "\nVoici la liste des équipages : \n\n";
    for (let index = 0; index < Membres.length; index++) {
        if (Membres[index][3]==""){
            Liste_crew += (index+1) + ". " + Membres[index][0] + " ne fait partie d'aucun équipage. \n";
        }else{
            Liste_crew += (index+1) + ". " + Membres[index][0] + " fait partie de l'équipage nommé " + Membres[index][3] + "\n";
        }
        
    }
    return Liste_crew;
}

bot.on('message', message=>{

    // Fonction printInfo : Permet de générer de manière organisée des messages d'erreurs. 
    function printInfo(msgType, msgTxt){
        switch(msgType){
            case "simple":
                message.channel.send("**Beleub Beleub \n**" + "```"  + msgTxt + "```" +  "*clac.*");
                break;
            case "reply":
                message.reply("**Beleub Beleub \n**" + "```"  + msgTxt + "```" + "*clac.*");
                break; 
            case 'identification':
                message.channel.send("**Beleub Beleub \n**" + msgTxt + "\n*clac.*");
                break;           
        }
    }

    // Fonction assignRole : Permet d'assigner un rôle de base à une personne rentrant dans un serveur. 
    let args = message.content.substring(PREFIX.length).split(" ");
    function assignRole(member2, roleName){
        member2.setRoles(["654738611274776576", roleName]);
        return member2;
    }

    function hasCaptain(Membres, crewName){
        var valid_2 = false;
        var indexCap = 0;
        for (let _9 = 0; _9 < Membres.length; _9++) {
            if (Membres[_9][3] == crewName){
                const memberID = message.guild.members.get(Membres[_9][2]);
                switch(memberID){
                    case memberID.roles.has(Roles[3][1]):
                        indexCap ++;
                        break;
                    case memberID.roles.has(Roles[4][1]):
                        indexCap ++;
                        break;  
                    case memberID.roles.has(Roles[5][1]):
                        indexCap ++;
                        break;
                    case memberID.roles.has(Roles[6][1]):
                        indexCap ++;
                        break;
                    case memberID.roles.has(Roles[7][1]):
                        indexCap ++;
                        break;   
                }
                
            }
        }
        if (indexCap>0){
            valid_2 = true;
        }else{
            valid_2 = false;
        }
        return valid_2;
    }
    function isCapable(Membres){
        var valid = false;
        for (let _7 = 0; _7 < Membres.length; _7++) {
            //const memberId = message.guild.member.get(Membres[_7][2]);
            switch (message.member.roles){
                case message.member.roles.has(Roles[3][1]):
                    valid = true;
                    break;
                case message.member.roles.has(Roles[4][1]):
                    valid = true;
                    break;  
                case message.member.roles.has(Roles[5][1]):
                    valid = true;
                    break;
                case message.member.roles.has(Roles[6][1]):
                    valid = true;
                    break;
                case message.member.roles.has(Roles[7][1]):
                    valid = true;
                    break;   
                default:
                    valid = false;         
            }
        }
        return valid;
    }
    // Fonction checkRoles : Permet de changer le rôle d'un utilisateur en fonction de sa prime.
    function checkRoles(Membres){
        for (let index = 0; index < Membres.length; index++) {
            const member1 = message.guild.members.get(Membres[index][2]);
            for (let index_sub = 0; index_sub < Membres.length; index_sub++) {
                if (Membres[index][1] < Roles_index[index_sub+1] && Membres[index][1] > Roles_index[index_sub])
                    {
                        if (!member1.roles.has(Roles[index_sub][1])){
                            assignRole(member1, Roles[index_sub][1]);
                            printInfo("identification", "<@" + Membres[index][2] + ">" + ", tu es devenu " + Roles[index_sub][0])
                        }
                }
                
            }
        }
    }
    
    function hasCrew(Membres, position, prize){
        var prizeIndex = 0;
        var Msgfinal = "";
        var MsgfinalPirates = "";
        if (Membres[position][3]!=""){
            if(isCapable(Membres)){
                updPrize = prize / 2;
                Membres[position][1] = Membres[position][1] + updPrize;
                Msgfinal += "Augmentation ! la prime de " + Membres[position][0]+ " est désormais de " + Membres[position][1] + " Berrys !\n";
                for (let _5 = 0; _5 < Membres.length; _5++) {
                    if (Membres[_5][3] == Membres[position][3]){
                        prizeIndex ++;
                    }
                    
                }
                var finalprize = updPrize/prizeIndex;
                for (let _6 = 0; _6 < Membres.length; _6++) {
                    if (Membres[_5][3] == Membres[position][3]){
                        Membres[_5][1] = Membres[_5][1] + finalprize;
                        MsgfinalPirates += "Augmentation ! la prime de " + Membres[_5][0]+ " est désormais de " + Membres[_5][1] + " Berrys !\n";
                    }
                }
            }
            checkRoles(Membres);
            printInfo("simple", Msgfinal);
            printInfo("simple", MsgfinalPirates);
            return Membres[_5][1], Membres[position][1]; 
        }else{
            Membres[position][1] = Membres[position][1] + prize;
            printInfo("simple", "Augmentation ! la prime de " + Membres[position][0]+ " est désormais de " + Membres[position][1] + " Berrys !");
            checkRoles(Membres);
            return Membres[position][1];
        }

    }
    // --- // 
    
    // Coeur du programme. 
    switch(args[0]){
        
        // Fonctionnalité Equipage : Permet de créer un équipage et de diviser la prime reçue. 
        case 'equipage':
            Msg = "";
            if (isCapable(Membres)){
                console.log("Tu est capable !");
                if (args[1] && args[1] != "quitte"){
                    for (let index = 0; index < Membres.length; index++) {
                        if (Membres[index][2]==message.member.id){
                            if (Membres[index][3] ==""){
                                for (let _2 = 0; _2 < Membres.length; _2++) {
                                    if (Membres[_2][3] != args[1]){
                                        Membres[index][3] = args[1];
                                        printInfo("identification", "<@" + Membres[index][2] + ">" + ", ton équipage s'appelle " + args[1]);
                                        break;
                                    }else{
                                        printInfo("reply", "ce nom d'équipage est déjà prit.");
                                        break;
                                    }
                                    
                                }
                                
                            }else{
                                for (let index = 0; index < Membres.length; index++) {
                                    for (let index_1 = 0; index_1 < Membres.length; index_1++) {
                                        if (Membres[index][0] == args[1]){
                                            if (Membres[index][0] == args[1] && Membres[index][3]){
                                                printInfo("simple", Membres[index][0] + " fait déjà partie d'un équipage");
                                                break
                                            }
                                            if (!Membres[index][3]){
                                                if (Membres[index_1][2] == message.member.id){
                                                    Membres[index][3] = Membres[index_1][3];
                                                    printInfo("simple", "<@" + Membres[index][2] + ">" + " a rejoint l'équipage de " + Membres[index_1][0] + ".");
                                                    break;
                                                }
                                            }   
                                        }
                                    }
                                    
                                }
                            }
                        }
                    } 
                }if (!args[1]){
                    printInfo("reply", "Précise le nom de ton équipage dans ta commande.")
                }if (args[1]){
                    printInfo("reply", "Commencez par devenir Capitaine ou supérieur afin de faire ça.")
                }
            }
            switch(args[1]){
                case "change":
                    if (isCapable(Membres)){
                        for (let index = 0; index < Membres.length; index++) {
                            if (message.member.id == Membres[index][2]){
                                if (args[2]){
                                    if (args[2] != Membres[index][3]){
                                        for (let _1 = 0; _1 < Membres.length; _1++) {
                                            if (Membres[_1][3] == Membres[index][3]){
                                                Membres[_1][3] = args[2];
                                            }   
                                        }
                                        printInfo("simple", Membres[index][0] + " change le nom de l'équipage ! Vous êtes désormais : " + args[2]);
                                        Membres[index][3] = args[2];
                                    }else{
                                        printInfo("reply", "le nom est déjà pris bg.")
                                    }
                                    
                                }
                            }
                        } 
                    }
                    break;
                case "quitte":
                    for (let index = 0; index < Membres.length; index++) {
                        if (message.member.id == Membres[index][2]){
                            for (let _3 = 0; _3 < Membres.length; _3++) {
                                //const member1 = message.guild.members.get(Membres[_3][2]);
                                if (!isCapable(Membres)){
                                    if (Membres[index][3]!=""){
                                        printInfo("simple", Membres[index][0] + " a quitté l'équipage " + Membres[index][3] +".");
                                        if (!hasCaptain(Membres, Membres[index][3])) {
                                            printInfo("simple", "Y'a pas de capitaine.");
                                        } 
                                        Membres[index][3] = "";
                                        break;                                        
                                    }else{
                                        printInfo("reply", "Tu ne fais parti d'aucun équipage déjà.");
                                        break;
                                    }
                                }else{
                                    if (!hasCaptain){
                                        for (let _10 = 0; _10 < Membres.length; _10++) {
                                            if (Membres[_10][3] == Membres[index][3]){
                                                Membres[_10][3] = "";
                                            }  
                                        }
                                        printInfo("simple", "Il n'y a plus de capitaine dans l'équipage. Ce dernier est alors dissocié.")
                                    }else{
                                        printInfo("simple", Membres[index][0] + " a quitté l'équipage " + Membres[index][3] +".");  
                                        Membres[index][3] = "";
                                        break;
                                    }
                                    break;
                                    // C'est ici qu'on appelerait la fonction Ya til encore un capitaine.
                                }
                                
                            }
                        
                    
                        }
                    }
                break;
                case "vire":
                    if (isCapable(Membres)){
                        for (let index = 0; index < Membres.length; index++) {
                            if (args[2] == Membres[index][0]){
                                for (let index_1 = 0; index_1 < Membres.length; index_1++) {
                                   if (Membres[index_1][2] == message.member.id){
                                       if (Membres[index_1][3] == Membres[index][3]){
                                           if (Membres[index_1][0] != args[2]){
                                                if (Membres[index][3]){
                                                    printInfo("simple", Membres[index][0] + " s'est fait exclure de l'équipage de " + Membres[index_1][0] + ".");
                                                    Membres[index][3] = "";
                                                }
                                           }else{
                                               printInfo("reply", "mdrr tu peux pas te virer de ton propre équipage.");
                                           }    
                                       }else{
                                        printInfo("reply", "il n'est ap de ton équipage.");
                                        break;
                                       }
                                   }
                                    
                                }
                            }
                            
                        }
                    }
                    
            }
        // Fonctionnalité Transfert : Permet de transferer une partie de sa bourse vers un autre pirate. Ok(3/1/20)
        case 'transfert':
            for (let index = 0; index < Membres.length; index++) {
                if (args[1] == Membres[index][0]){
                    if (args[2]!=null && parseInt(args[2]) > 0 && Membres[index][2] != message.member.id){
                                for (let index_2 = 0; index_2 < Membres.length; index_2++) {
                                    if (message.member.id==Membres[index_2][2]){
                                        if (parseInt(args[2])<Membres[index_2][1]){
                                            Membres[index][1] = Membres[index][1] + parseInt(args[2]);
                                            Membres[index_2][1] =  Membres[index_2][1] - parseInt(args[2]);
                                            printInfo("identification", "<@" + Membres[index][2] + ">" + ", tu as reçu une partie de la prime de " + Membres[index_2][0] + ".")
                                            break;
                                        }
                                        else{
                                            printInfo("reply", "Erreur | Action impossible")
                                            break;
                                        }
                                    }
                                }
                                } 
                            }  
                        }
                        break;

        // Fonctionnalité Suppression : Permet de supprimer un certains nombres de message ou celui que l'on vient d'ajouter. Ok(3/1/20)    
        case 'supprime':
            if (!args[1]) message.channel.bulkDelete(3);
            if (args[1]<=100) message.channel.bulkDelete(args[1]);
            if (args[1]>100) printInfo("reply", "Erreur | Le nombre maximum est de 100.");
            if (args[1]<1) printInfo("reply", "Erreur | Le nombre minimum est 1.");
            break;

        // Fonctionnalité Primes : Permet d'afficher toutes les primes. Il s'agit de la fonction la plus utilisée.  Ok(3/1/20)   
        case 'primes':
            printInfo("simple", getBounty(Membres));
            break;

        // Fonctionnalité Membres : Permet d'afficher tous les pirates.    Ok(3/1/20) 
        case 'membres':
            printInfo("simple", getPirates(Membres));
            break;    

        case 'equipages':
            printInfo("simple", getCrew(Membres));
            break;    
        // Fonctionnalité Prime : Permet d'afficher sa propre prime ou une prime spécifique.     Ok(3/1/20)
        case 'prime':
            if (!args[1]){
                for (let index = 0; index < Membres.length; index++) {
                    if (message.member.id == Membres[index][2]){
                        printInfo("reply", ('Ta prime est de ' + Membres[index][1] + ' berrys.'));
                    }
                }    
            }else{
                for (let index = 0; index < Membres.length; index++) {
                    if (args[1] == Membres[index][0]){
                        printInfo("simple", ('La prime de '+ Membres[index][0] + ' est de ' + Membres[index][1] + ' berrys.'));
                    }
                }  
            }
        break;

        // Fonctionnalité Modification : Fonctionnalité Privée - Permet d'effectuer des modifications directement sur les primes. 
        case 'modification':
            if(!message.guild.members.get("391581984956350465")) return message.channel.send("Tu n'as pas vraiment le droit de faire ça...")
            for (let oudex  = 0; oudex < Membres.length; oudex++) {
                if (args[1] == Membres[oudex][0]){
                    switch (args[2]){
                        case "+":
                            hasCrew(Membres, oudex, parseInt(args[3]));
                    }
                }
            }    
    }
})
bot.login(process.env.BOT_TOKEN);
