// Mise en place système. 
const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = '!';

// Liste des participants, noms et primes. 
Membres = [["ener", 273000, "443703085253132288"], ["zoro", 179000, "652940533253144579"],
["mihawk", 98000, "526048864919355392"], ["shanks", 728000, "342435810965979138"],
["chopper", 112000, "391581984956350465"],["sugar", 4, "654047627817779210"], 
["katakuri", 215000, "326811822726447115"],["bellamy", 25000, "404639144724398080"], 
["arlong", 0, "527604578506637332"],["edwardnewgate", 0, "469042136311136256"], 
["alvida", 50000, "653621701359173672"],["sanji", 75000, "653603212963741706"], 
["benbeckman", 58325, "480006189070155787"], ["pedro", 0, "269890311029915648"],
["usopp", 0, "573111845666291714"]];
Membres.sort(function(a,b){
    return b[1]-a[1]
});
var Liste_primes = "";
var Liste = ""
Roles = [["Esclave", "653974762590044162"], ["Brigand", "653625434285539358"], 
["Pirate", "653625269545992212"], ["Capitaine", "655349115827257344"], ["Super Nova", "653976486533136417"], 
["Corsaire", "653625135818866708"], ["Grand Corsaire", "653624948547387393"], ["Empereur", "653975929822904350"]]
Roles_index =["-999999999", "0", "100000", "250000", "500000", "1000000", "500000000", "1000000000"]
bot.on('ready', () =>{
    console.log("Le bot est connecté!");
})
function primes(Membres) {
    Liste_primes = "Liste des primes : \n\n";
    for (let index = 0; index < Membres.length; index++) {
        Liste_primes += (index+1) + '. La prime de '+ Membres[index][0] + ' est de ' + Membres[index][1] + ' berrys.\n';
    }
    return Liste_primes;
}
function taille(Membres) {
    Liste = "";
    for (let index = 0; index < Membres.length; index++) {
        Liste += (index+1) + '. ' +  Membres[index][0] + '.\n';
    }
    return Liste;
}

bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");
    function assignRole(member2, roleName){
        member2.setRoles(["654738611274776576", roleName]);
        return member2;
    }

    function checkRoles(Membres){
        for (let index = 0; index < Membres.length; index++) {
            const member1 = message.guild.members.get(Membres[index][2]);
            for (let index_sub = 0; index_sub < Membres.length; index_sub++) {
                if (Membres[index][1] < Roles_index[index_sub+1] && Membres[index][1] > Roles_index[index_sub])
                    {
                        if (!member1.roles.has(Roles[index_sub][1])){
                            assignRole(member1, Roles[index_sub][1]);
                            message.channel.sendMessage("<@" + Membres[index][2] + ">" + ", tu es devenu " + Roles[index_sub][0]);
                        }
                }
                
            }
        }
    }

    switch(args[0]){
        case 'transfert':
            for (let index = 0; index < Membres.length; index++) {
                if (args[1] == Membres[index][0]){
                    if (args[2]!=null && parseInt(args[2]) > 0 && Membres[index][2] != message.member.id){
                                for (let index_2 = 0; index_2 < Membres.length; index_2++) {
                                    if (message.member.id==Membres[index_2][2]){
                                        if (parseInt(args[2])<Membres[index_2][1]){
                                            Membres[index][1] = Membres[index][1] + parseInt(args[2]);
                                            message.channel.sendMessage("Tu as gagné de l'argent");
                                            Membres[index_2][1] =  Membres[index_2][1] - parseInt(args[2]);
                                            message.channel.sendMessage("Tu as perdu de l'argent");
                                            break;
                                        }
                                        else{
                                            message.channel.sendMessage("Action Impossible.");
                                            break;
                                        }
                                    }
                                }
                                }    
                            }  
                        }
            break;    
        case 'supprime':
            if(!args[1]) return message.reply('Erreur. Définissez le nombre de messages à supprimer (en comptant le votre).')
            if (args[1]<=100){
                message.channel.bulkDelete(args[1]);
            }else{
                message.reply('Erreur. Le nombre maximum est de 100')
            } 
            break;
        case 'primes':
            const member_u = message.guild.members.get("391581984956350465");
            member_u.addRole("name", "Membre");
            message.channel.sendMessage(primes(Membres));
            break;
        case 'membres':
            message.channel.sendMessage(taille(Membres));
            break;    
        case 'prime':
            for (let index = 0; index < Membres.length; index++) {
                if (args[1] == Membres[index][0]){
                    message.channel.sendMessage('La prime de '+ Membres[index][0] + ' est de ' + Membres[index][1] + ' berrys.');
                }
                if (message.member.id == Membres[index][2]){
                    message.channel.sendMessage("<@" + Membres[index][2] + ">" + ', ta prime est de ' + Membres[index][1] + ' berrys.');
                }
            }    
        break;
        case 'modification':
                if(!message.guild.members.get("391581984956350465")) return message.channel.send("Tu n'as pas vraiment le droit de faire ça...")
                if (args[1] == "tous"){
                    switch (args[2]){
                        case "+":
                            message.channel.sendMessage("Augmentation ! Tous le monde augmente sa prime de " + args[3] + " Berrys ! ");
                            for (let index = 0; index < Membres.length; index++) {
                                Membres[index][1] += parseInt(args[3]);                                
                            }
                            checkRoles(Membres);
                            break;
                        case "-":
                            message.channel.sendMessage("Diminution ! Tous le monde a sa prime diminuée de " + args[3] + " Berrys ! ");
                            for (let index = 0; index < Membres.length; index++) {
                                Membres[index][1] -= parseInt(args[3]);                                
                            }
                            checkRoles(Membres);
                            break;
                }
            }
            for (let oudex  = 0; oudex < Membres.length; oudex++) {
                if (args[1] == Membres[oudex][0]){
                    switch (args[2]){
                        case "+":
                            Membres[oudex][1] = Membres[oudex][1] + parseInt(args[3]);
                            message.channel.sendMessage("Augmentation ! la prime de " + Membres[oudex][0]+ " est désormais de " + Membres[oudex][1] + " Berrys !");
                            checkRoles(Membres)
                            return Membres[oudex][1]
                            break;
                        case "-":
                            Membres[oudex][1] = Membres[oudex][1] - parseInt(args[3]);
                            message.channel.sendMessage("Diminution ! la prime de " + Membres[oudex][0]+ " est désormais de " + Membres[oudex][1] + " Berrys !");
                            checkRoles(Membres)
                            return Membres[oudex][1]
                            break;
                        case "*":
                            Membres[oudex][1] = Membres[oudex][1] * parseInt(args[3]);
                            message.channel.sendMessage("Multiplication ! la prime de " + Membres[oudex][0]+ " est désormais de " + Membres[oudex][1] + " Berrys !");
                            checkRoles(Membres)
                            return Membres[oudex][1]
                            break;
                        case "=":
                            Membres[oudex][1] = parseInt(args[3]);
                            message.channel.sendMessage("Assignation ! la prime de " + Membres[oudex][0]+ " est désormais de " + Membres[oudex][1] + " Berrys !");
                            checkRoles(Membres)
                            return Membres[oudex][1]
                            break;      
                    }
                }
            }    
    }
})
bot.login(process.env.BOT_TOKEN);
