// Mise en place système. 
const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = '!';

// Liste des participants, noms et primes. 
Membres = [["ener", 0, "443703085253132288"], ["zoro", 0, "652940533253144579"],
["mihawk", 0, "526048864919355392"], ["shanks", 0, "342435810965979138"],
["chopper", 0, "391581984956350465"],["sugar", 0, "654047627817779210"], 
["katakuri", 0, "326811822726447115"],["bellamy", 0, "404639144724398080"], 
["arlong", 0, "527604578506637332"],["edward newgate", 0, "469042136311136256"], 
["alvida", 0, "653621701359173672"],["sanji", 0, "653603212963741706"], 
["ben beckman", 0, "480006189070155787"]];
var Liste_primes = "";
var Liste = ""
Roles = [["Esclave", "653974762590044162"], ["Brigand", "653625434285539358"], 
["Pirate", "653625269545992212"], ["Super Nova", "653976486533136417"], 
["Corsaire", "653625135818866708"], ["Grand Corsaire", "653624948547387393"], ["Empereur", "653975929822904350"]]
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
bot.on('guildMemberAdd', function(member){
    let memberRole = member.guild.roles.find("name", "Brigand");
    member.addRole(memberRole);
})


bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");
    function assignRole(member2, roleName){
        member2.setRoles(["654738611274776576", roleName]);
        return member2;
    }
    function level(Membres){
        for (let i = 0; i < Membres.length; i++) {
            const member1 = message.guild.members.get(Membres[i][2]);
            if (member1){
                switch(true){
                    case Membres[i][1] < 0:
                        assignRole(member1, "653974762590044162");
                        message.channel.sendMessage(Membres[i][0] + " est devenu un Esclave !");
                        break;
                    case Membres[i][1] > 0 && Membres[i][1] < 100000:
                        assignRole(member1, "653625434285539358");
                        message.channel.sendMessage(Membres[i][0] + " est devenu un Brigand !");
                        break; 
                    case Membres[i][1] > 100000 && Membres[i][1] < 500000:
                        assignRole(member1, "653625269545992212");
                        message.channel.sendMessage(Membres[i][0] + " est devenu un Pirate !");
                        break;
                    case Membres[i][1] > 500000 && Membres[i][1] < 1000000:
                        assignRole(member1, "653976486533136417");
                        message.channel.sendMessage(Membres[i][0] + " est devenu une Super Nova !");
                        break;  
                    case Membres[i][1] > 1000000 && Membres[i][1] < 500000000:
                        assignRole(member1, "653625135818866708");
                        message.channel.sendMessage(Membres[i][0] + " est devenu un Corsaire !");
                        break; 
                    case Membres[i][1] > 500000000 && Membres[i][1] < 1000000000:
                        assignRole(member1, "653624948547387393");
                        message.channel.sendMessage(Membres[i][0] + " est devenu un Grand Corsaire !");
                        break;  
                    case Membres[i][1] > 1000000000 :
                            assignRole(member1, "653975929822904350");
                        message.channel.sendMessage(Membres[i][0] + " est devenu un Empereur !");
                        break;                   
            }
        } 
        }
    }
    switch(args[0]){
        case 'supprime':
            if(!args[1]) return message.reply('Erreur. Définissez le nombre de messages à supprimer (en comptant le votre).')
            if (args[1]<=100){
                message.channel.bulkDelete(args[1]);
            }else{
                message.reply('Erreur. Le nombre maximum est de 100')
            } 
            break;
        case 'primes':
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
            }    
        break;
        case 'modification':
            if(!message.guild.members.get("391581984956350465")) return message.channel.send("Tu n'as pas vraiment le droit de faire ça...")
            for (let oudex  = 0; oudex < Membres.length; oudex++) {
                if (args[1] == Membres[oudex][0]){
                    switch (args[2]){
                        case "+":
                            Membres[oudex][1] = Membres[oudex][1] + parseInt(args[3]);
                            message.channel.sendMessage("Augmentation ! la prime de " + Membres[oudex][0]+ " est désormais de " + Membres[oudex][1] + " Berrys !");
                            level(Membres);
                            return Membres[oudex][1]
                            break;
                        case "-":
                            Membres[oudex][1] = Membres[oudex][1] - parseInt(args[3]);
                            message.channel.sendMessage("Diminution ! la prime de " + Membres[oudex][0]+ " est désormais de " + Membres[oudex][1] + " Berrys !");
                            level(Membres);
                            return Membres[oudex][1]
                            break;
                        case "=":
                            Membres[oudex][1] = parseInt(args[3]);
                            message.channel.sendMessage("Assignation ! la prime de " + Membres[oudex][0]+ " est désormais de " + Membres[oudex][1] + " Berrys !");
                            level(Membres);
                            return Membres[oudex][1]
                            break;      
                    }
                }
            }    
    }
})
bot.login(process.env.BOT_TOKEN);
