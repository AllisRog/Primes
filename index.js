// Mise en place système. 
const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = '!';

// Liste des noms, primes, codes Discord et Equipages.  
Membres = [["ener", 273000, "443703085253132288", ""], ["zoro", 179000, "652940533253144579", "MugiwaraTest"],
["mihawk", 98000, "526048864919355392", ""], ["shanks", 728000, "342435810965979138", "MugiwaraTest"],
["chopper", 112000, "391581984956350465", ""],["sugar", 3, "654047627817779210", ""], 
["katakuri", 215000, "326811822726447115", ""],["bellamy", 25000, "404639144724398080", "MugiwaraTest"], 
["arlong", 0, "527604578506637332", ""],["edwardnewgate", 0, "469042136311136256", ""], 
["alvida", 50000, "653621701359173672", ""],["sanji", 75000, "653603212963741706", ""], 
["benbeckman", 58325, "480006189070155787", "MugiwaraTest"], ["pedro", 0, "269890311029915648", ""],
["usopp", 0, "573111845666291714", ""]];
Membres.sort(function(a,b){
    return b[1]-a[1]
});

// Liste des rôles pour les différentes primes. 
Roles = [["Esclave", "653974762590044162"], ["Brigand", "653625434285539358"], 
["Pirate", "653625269545992212"], ["Capitaine", "655349115827257344"], ["Super Nova", "653976486533136417"], 
["Corsaire", "653625135818866708"], ["Grand Corsaire", "653624948547387393"], ["Empereur", "653975929822904350"], ["testingPurposes", "661904989668507658"]];
Roles_index =["-999999999", "0", "100000", "250000", "500000", "1000000", "500000000", "1000000000"];
bot.on('ready', () =>{
    console.log("Le bot est connecté!");
})

// Fonction getBounty : Permet de générer une liste de toutes les primes des participants.
function getBounty(Membres) {
    var listBounty = "\nVoici la liste des primes : \n\n";
    for (let bntIdx = 0; bntIdx < Membres.length; bntIdx++) {
        listBounty += (bntIdx+1) + '. La prime de '+ Membres[bntIdx][0] + ' est de ' + Membres[bntIdx][1] + ' berrys.\n';
    }
    return listBounty;
}

// Fonction getPirates : Permet de générer une liste de tous les pirates. 
function getPirates(Membres) {
    var listPirates = "\nVoici la liste des pirates : \n\n";
    for (let prtIdx = 0; prtIdx < Membres.length; prtIdx++) {
        listPirates += (prtIdx+1) + '. ' +  Membres[prtIdx][0] + '.\n';
    }
    return listPirates;
}

// Fonction getCrew : Permet de générer une liste de tous les équipages. 
function getCrew(Membres){
    var listCrew = "\nVoici la liste des équipages : \n\n";
    for (let crewIdx = 0; crewIdx < Membres.length; crewIdx++) {
        if (Membres[crewIdx][3]==""){
            listCrew += (crewIdx+1) + ". " + Membres[crewIdx][0] + " ne fait partie d'aucun équipage. \n";
        }else{
            listCrew += (crewIdx+1) + ". " + Membres[crewIdx][0] + " fait partie de l'équipage nommé " + Membres[crewIdx][3] + "\n";
        }
        
    }
    return listCrew;
}

// Fonction getMember : Permet de d'assigner l'ID de la personne à son "fichier".
function getMember(Membres, ID, style, arg){
    switch (style){
        case 'Nhimself':
            for (let mbrIdx_n = 0; mbrIdx_n < Membres.length; mbrIdx_n++) {
                if (Membres[mbrIdx_n][0]==arg){
                    if (Membres[mbrIdx_n][2] != ID){
                        return 1;
                    }else{
                        return 0;
                    }
                }      
            }
        case 'arg':
            for (let mbrIdx = 0; mbrIdx < Membres.length; mbrIdx++) {
                if (Membres[mbrIdx][0]==arg){
                    return true;
                }      
            }
            break;
        case 'arg_pos':
            for (let mbrIdxPos = 0; mbrIdxPos < Membres.length; mbrIdxPos++) {
                if (Membres[mbrIdxPos][0]==arg){
                    return mbrIdxPos;
                }      
            }
            break;    
        case 'pos':
            for (let mbrIdx = 0; mbrIdx < Membres.length; mbrIdx++) {
                if (Membres[mbrIdx][2] == ID){
                    return mbrIdx
                }
                
            }
            break;
        case 'exist':
            for (let mbrIdx = 0; mbrIdx < Membres.length; mbrIdx++) {
                if (Membres[mbrIdx][2] == ID){
                    return true;
                }
                
            }
            break;       
    }
}
bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");

    // Fonction printInfo : Permet de générer de manière organisée différents types de messages.
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
 
    // Fonction assignRole : Permet d'assigner un rôle à une pirate.
    function assignRole(member, roleName){
        member.setRoles(["654738611274776576", roleName]);
        return member;
    }
    function hasRole(member){
        var roleCheck = false;
        for (let roleIdx = 3; roleIdx < 9; roleIdx++) {
            if(member.roles.has(Roles[roleIdx][1])){
                roleCheck = true;
                break   
            }
        }
        return roleCheck;
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

    function getEquipage(Membres, ID, style){
        var capIdx = 0;
        switch (style){
            case "equipage_check":
                for (let mbrIdx_ec = 0; mbrIdx_ec < Membres.length; mbrIdx_ec++) {
                    if (Membres[mbrIdx_ec][2]==ID && Membres[mbrIdx_ec][3]!=""){
                        return true;
                    }               
                }
            case "equipage_name":
                for (let mbrIdx_en = 0; mbrIdx_en < Membres.length; mbrIdx_en++) {
                    if (Membres[mbrIdx_en][2]==ID && Membres[mbrIdx_en][3]!=""){
                        return Membres[mbrIdx_en][3];
                    }
                    
                }  
            case "numberOfCptn":
                for (let mbrIdx_en = 0; mbrIdx_en < Membres.length; mbrIdx_en++) {
                    if (Membres[mbrIdx_en][2]==ID && Membres[mbrIdx_en][3]!=""){
                        for (let mbrIdx_nc = 0; mbrIdx_nc < Membres.length; mbrIdx_nc++) {
                            if (Membres[mbrIdx_nc][3]==Membres[mbrIdx_en][3] && hasRole(message.guild.members.get(ID))){
                                capIdx++;
                            }        
                        }
                    }                
                }return capIdx;  
            }
    }
    function Bounty(Membres, prize, arg_s){
        var BntyID = getMember(Membres, 0, "arg_pos", arg_s);
        var file = Membres[BntyID][2];
        var newPrize = prize;
        if (getMember(Membres, file, "equipage_check", arg_s) && hasRole(message.guild.member.get(file))){
            newPrize = prize / getEquipage(Membres, file, "numberOfCptn");
            Membres[BntyID][1] += newPrize;
            printInfo("simple", "Augmentation ! la prime de " + Membres[BntyID][0]+ " est désormais de " 
            + Membres[BntyID][1] + " Berrys !");
            checkRoles(Membres);
            return Membres[BntyID][1];
        }else{
            Membres[BntyID][1] += prize;
            printInfo("simple", "Augmentation ! la prime de " + Membres[BntyID][0]+ " est désormais de " 
            + Membres[BntyID][1] + " Berrys !");
            checkRoles(Membres);
            return Membres[BntyID][1];
        }      
    }
    function addBounty(Membres, prize, ID, arg){
        var capIndex = 1;
        var capPrize = prize;
        var prtPrize = prize;
        var concernedId = getMember(Membres, ID, "arg_pos", arg);
        var memberID = Membres[concernedId][2];
        let Md_cns = [getMember(Membres, memberID, "equipage_check", arg), 
        hasRole(message.guild.members.get(memberId))];
        if (Md_cns.indexOf(false)===-1){
            for (let bntyIdx = 0; bntyIdx < Membres.length; bntyIdx++) {
                if(Membres[bntyIdx][3]==getMember(Membres, memberID, "equipage_name", args[1])){
                    if(hasRole(message.guild.members.get(Membres[bntyIdx][2]))){
                        capIndex++;
                    }                  
                }               
            }
            capPrize = prize / capIndex+1;
            Membres[getMember(Membres, memberID, "pos", args[1])][1] = Membres[getMember(Membres, memberID, "pos", args[1])][1] + capPrize;
            printInfo("simple", "Augmentation ! la prime de " + Membres[getMember(Membres, memberID, "pos", args[1])][0]+ " est désormais de " 
            + Membres[getMember(Membres, memberID, "pos", args[1])][1] + " Berrys !");
            checkRoles(Membres);
            return Membres[getMember(Membres, memberID, "pos", args[1])][1];
        }else{
            Membres[getMember(Membres, memberID, "pos", args[1])][1] = Membres[getMember(Membres, memberID, "pos", args[1])][1] + prize;
            printInfo("simple", "Augmentation ! la prime de " + Membres[getMember(Membres, memberID, "pos", args[1])][0]+ " est désormais de " 
            + Membres[getMember(Membres, memberID, "pos", args[1])][1] + " Berrys !");
            checkRoles(Membres);
            return Membres[getMember(Membres, memberID, "pos", args[1])][1];
        }

    }
    /*function hasCrew(Membres, prize, ID){
        //const member = message.guild.members.get(Membres[position][2]);
        var prizeIndex = 0;
        var Msgfinal = "";
        var MsgfinalPirates = "";
        if (getMember(Membres, ID, "equipage_check", args[1])){
            updPrize = prize / 2;
            if(hasRole(message.guild.members.get(ID))){
                Membres[getMember(Membres, ID, "pos", args[1])][1] += updPrize;
                Msgfinal += "Augmentation ! la prime de " + Membres[getMember(Membres, ID, "pos", args[1])][0]+ " est désormais de " + 
                Membres[getMember(Membres, ID, "pos", args[1])][1] + " Berrys !\n";
                for (let _5 = 0; _5 < Membres.length; _5++) {
                    if (Membres[_5][3] == Membres[getMember(Membres, ID, "pos", args[1])][3]){
                        prizeIndex ++;
                        return prizeIndex;
                    }
                    
                }
            var finalprize = updPrize/prizeIndex;
            for (let _6 = 0; _6 < Membres.length; _6++) {
                if (Membres[_6][3] == Membres[getMember(Membres, ID, "pos", args[1])][3]){
                    Membres[_6][1] = Membres[_6][1] + finalprize;
                    MsgfinalPirates += "Augmentation ! la prime de " + Membres[_6][0]+ " est désormais de " + Membres[_6][1] + " Berrys !\n";
                    printInfo("simple", MsgfinalPirates); 
                    return Membres[_6][1];                   
                }
            }
        }
        checkRoles(Membres);
        if (Msgfinal!="") {printInfo("simple", Msgfinal);}
        return Membres[getMember(Membres, ID, "pos", args[1])][1]; 
        }
        else{
            Membres[getMember(Membres, ID, "pos", args[1])][1] = Membres[getMember(Membres, ID, "pos", args[1])][1] + prize;
            printInfo("simple", "Augmentation ! la prime de " + Membres[getMember(Membres, ID, "pos", args[1])][0]+ " est désormais de " 
            + Membres[getMember(Membres, ID, "pos", args[1])][1] + " Berrys !");
            checkRoles(Membres);
            return Membres[getMember(Membres, ID, "pos", args[1])][1];
        }

    }*/
    // --- // 
    
    // Coeur du programme. 
    switch(args[0]){
        
        case 'test':
            if (hasRole(message.guild.member.get(message.author.id))){
                printInfo("simple", "you have a right role.");
            }
            break;
        // Fonctionnalité Transfert : Permet de transferer une partie de sa bourse vers un autre pirate. Ok(3/1/20)
        case 'transfert':
            let Tf_cns = [args[2]!=null,parseInt(args[2])>0,getMember(Membres, message.member.id, "Nhimself", args[1])==1,
            getMember(Membres, message.member.id, "arg", args[1])];
            // Si le nom écrit existe
            if (Tf_cns.indexOf(false)===-1){
                if (Membres[getMember(Membres, message.member.id, "pos", args[1])][1]>parseInt(args[2])){
                    Membres[getMember(Membres, message.member.id, "arg_pos", args[1])][1] += parseInt(args[2]);
                    Membres[getMember(Membres, message.member.id, "pos", args[1])][1] -= parseInt(args[2]);
                    printInfo("identification", "<@" + Membres[getMember(Membres, message.member.id, "arg_pos", args[1])][2] + ">" + 
                    ", tu as reçu une partie de la prime de " + Membres[getMember(Membres, message.member.id, "pos", args[1])][0] + ".");
                }else{
                    printInfo("simple", "Erreur | Montant supérieur à ce que vous avez.");
                }   
            }else{
                printInfo("simple", "Erreur");
            }
            break;
        
        // Fonctionnalité Suppression : Permet de supprimer un certains nombres de message ou celui que l'on vient d'ajouter. Ok(3/1/20)    
        case 'supprime':
            if (!args[1]) message.channel.bulkDelete(3);
            if (args[1]<=100) message.channel.bulkDelete(args[1]);
            if (args[1]>100) printInfo("reply", "Erreur | Le nombre maximum est de 100.");
            if (args[1]<1) printInfo("reply", "Erreur | Le nombre minimum est 1.");
            break;

        // Fonctionnalité Primes : Permet d'afficher toutes les primes. Il s'agit de la fonction la plus utilisée. 
        case 'primes':
            printInfo("simple", getBounty(Membres));
            break;

        // Fonctionnalité Membres : Permet d'afficher tous les pirates.   
        case 'membres':
            printInfo("simple", getPirates(Membres));
            break;    

        // Fonctionnalité Equipages : Permet d'afficher tous les équipages.    
        case 'equipages':
            printInfo("simple", getCrew(Membres));
            break;  

        // Fonctionnalité Prime : Permet d'afficher sa propre prime ou une prime spécifique.     
        case 'prime':
            if (!args[1]){
                printInfo("reply", ('Ta prime est de ' + Membres[getMember(Membres, message.member.id, "pos", args[1])][1] + ' berrys.')); 
            }else{
                printInfo("simple", ('La prime de '+ Membres[getMember(Membres, message.member.id, "arg_pos", args[1])][0] + ' est de ' + 
                Membres[getMember(Membres, message.member.id, "arg_pos", args[1])][1] + ' berrys.'));
            }
        break;

        // Fonctionnalité Modification : Fonctionnalité Privée - Permet d'effectuer des modifications directement sur les primes. 
        case 'modification':
            arg = message.author.id;
            if(!message.guild.members.get("391581984956350465")) return message.channel.send("Tu n'as pas vraiment le droit de faire ça...")
            /*for (let oudex  = 0; oudex < Membres.length; oudex++) {
                if (args[1] == Membres[oudex][0]){*/
            if(getMember(Membres, message.member.id, "arg", args[1]) && args[3]){
                switch (args[2]){
                    case "+":
                        Bounty(Membres, parseInt(args[3]), args[1]);
                        break;
                        //addBounty(Membres, parseInt(args[3]), message.member.id, args[1]);
                        //hasCrew(Membres, parseInt(args[3]), Membres[getMember(Membres, message.member.id, "arg_pos", args[1])][2]);
                }
        }    
    }         
})
bot.login(process.env.BOT_TOKEN);
