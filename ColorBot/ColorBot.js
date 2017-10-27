const botSettings = require("./settings.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

const fs = require("fs");
var contents = fs.readFileSync("colors.json");

var $colors = [];
$colors = JSON.parse(contents);

const PREFIX = botSettings.prefix;
const TOKEN = botSettings.token;

/*
THE MOST IMPORTANT FUNCTION:
    $colors.forEach((data) => {
        console.log(data.<option>);
    });
*/

bot.on("ready", () =>
{
    console.log(`Bot is ready! ${bot.user.username}`);
});

bot.on("message", async message =>
{
    if(message.author.bot) return;
    if(!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");
    
    colorRed = message.member.guild.roles.find("name", "#RED");
    colorOrange = message.member.guild.roles.find("name", "#ORANGE");
    colorYellow = message.member.guild.roles.find("name", "#YELLOW");
    colorGreen = message.member.guild.roles.find("name", "#GREEN");
    colorBlue = message.member.guild.roles.find("name", "#BLUE");
    colorPurple = message.member.guild.roles.find("name", "#PURPLE");


    switch(args[0].toLowerCase())
    {
        case "color":
            if(args[1])
            {
                switch(args[1].toLowerCase())
                {

                    case "red":
                        message.member.addRole(colorRed);
                        message.channel.send("Color changed to: " + colorRed);
                        break;
                    case "orange":
                        message.member.addRole(colorOrange);
                        message.channel.send("Color changed to: " + colorOrange);
                        break;
                    case "yellow":
                        message.member.addRole(colorYellow);
                        message.channel.send("Color changed to: " + colorYellow);
                        break;
                    case "green":
                        message.member.addRole(colorGreen);
                        message.channel.send("Color changed to: " + colorGreen);
                        break;
                    case "blue":
                        message.member.addRole(colorBlue);
                        message.channel.send("Color changed to: " + colorBlue);
                        break;
                    case "purple":
                        message.member.addRole(colorPurple);
                        message.channel.send("Color changed to: " + colorPurple);
                        break;
                    case "add":
                        if(message.member.hasPermission("MANAGE_ROLES"))
                        {
                            if(args[2].startsWith("#"))
                            {
                                if(args[3])
                                {
                                    if(!args[3].startsWith("#")) 
                                    {
                                        message.channel.send("Use `#` to specify a color's role!");
                                    }
                                    else
                                    {                               
                                        message.guild.createRole({ name:args[3].toUpperCase(), color:args[2] });
                                        message.channel.send(`Role Created | NAME: ${args[3].toUpperCase()} & HEX: ${args[2]}`);
                                    }
                                }
                                else
                                {
                                    message.channel.send("Please specify a role name!")
                                }
                            }
                            else
                            {
                                message.channel.send("Please specify a hex color!");
                            }
                        }
                        else
                        {
                            message.channel.send("Invalid Permissions");
                        }
                        break;
                    default:
                        message.channel.send("Unkown Color!");
                        break;
                }
            }
            else
            {
                message.channel.send("Please specify a color. Use `!colors`");
            }
            break;
        case "colors":
            message.channel.send("Availible Colors are:\n\n" + 
                $colors.toString() + "\n\nTo join one, type: `!color <COLORNAME>` Example: `!color red`");
            break;
        default:
            message.channel.send("Invalid Command!");
            break;
    }
});

bot.login(TOKEN);
