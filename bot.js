// Mise en place système. 
const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = '!';

// Liste des participants, noms et primes. 
Membres = [["kizaru", 100000],["momonga", 0],["fujitora", 0],
["coby", 0], ["garp", 0], ["hina", 0], ["jango", 0], ["nezumi", 0],
["shû", 0], ["smoker", 0], ["akainu", 0]]
var Liste_primes = "";
var Liste = ""

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
    let memberRole = member.guild.roles.find("name", "Member");
    member.addRole(memberRole);
})


bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");

    for (let i = 0; i < Membres.length; i++) {
        if (Membres[i][1]==100000){
            let memberRole = message.member.roles.find("Pirate");
            message.guild.get_member("my id").addRole(memberRole);
            //message.channel.sendMessage("Félicitations tu deviens pirate !");
            //let memberRole = member.guild.roles.find(Pirate);
            //message.server.get_member("391581984956350465").addRole(memberRole);
        }
    }

    switch(args[0]){
        case 'supprime':
            if(!args[1]) return message.reply('Erreur. Définissez le nombre de messages à supprimer (en comptant le votre).')
            message.channel.bulkDelete(args[1]);
            break;
        case 'liste':
            switch(args[1]){
                case 'primes':
                    message.channel.sendMessage(primes(Membres));
                    break;
                case 'membres':
                    message.channel.sendMessage(taille(Membres));
                    break;   
                default:
                    message.channel.sendMessage("Veuillez spécifier quelle liste vous intéresse.");    
            }
            
        break;
        case 'prime':
            for (let index = 0; index < Membres.length; index++) {
                if (args[1] == Membres[index][0]){
                    message.channel.sendMessage('La prime de '+ Membres[index][0] + ' est de ' + Membres[index][1] + ' berrys.');
                }
            }    
        break;
        case 'modification':
            if(!message.member.roles.find(r => r.name === "Propriétaire")) return message.channel.send("Tu n'as pas vraiment le droit de faire ça...")
            for (let oudex  = 0; oudex < Membres.length; oudex++) {
                if (args[1] == Membres[oudex][0]){
                    switch (args[2]){
                        case "+":
                            Membres[oudex][1] = Membres[oudex][1] + parseInt(args[3]);
                            message.channel.sendMessage("Augmentation ! la prime de " + Membres[oudex][0]+ " est désormais de " + Membres[oudex][1] + " Berrys !");
                            return Membres[oudex][1]
                            break;
                        case "-":
                            Membres[oudex][1] = Membres[oudex][1] - parseInt(args[3]);
                            message.channel.sendMessage("Diminution ! la prime de " + Membres[oudex][0]+ " est désormais de " + Membres[oudex][1] + " Berrys !");
                            return Membres[oudex][1]
                            break;
                        case "x":
                            Membres[oudex][1] = Membres[oudex][1] - parseInt(args[3]);
                            message.channel.sendMessage("Diminution ! la prime de " + Membres[oudex][0]+ " est désormais de " + Membres[oudex][1] + " Berrys !");
                            return Membres[oudex][1]
                            break;    
                    }
                }
            }    
    }
})
bot.login(process.env.BOT_TOKEN);
