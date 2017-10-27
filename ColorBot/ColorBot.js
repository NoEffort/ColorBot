const botSettings = require("./settings.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

const fs = require("fs");
var contents = fs.readFileSync("colors.json");

var $colors = [];
$colors = JSON.parse(contents);
bot.colors = require("./colors.json");

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
                                        let role = message.member.guild.roles.find(r => r.name === args[3]);
                                        if(!role)
                                        {
                                            try
                                            {
                                                role = await message.guild.createRole({
                                                    name: args[3].toUpperCase(),
                                                    color: args[2] 
                                                });

                                                bot.colors[role] = 
                                                {
                                                    role: args[3].toUpperCase(),
                                                    hex: args[2]
                                                }

                                                fs.writeFileSync("colors.json", JSON.stringify(bot.colors, null, 4), err =>
                                                {
                                                    if(err) throw err;
                                                    message.channel.send(`Role Created | NAME: ${args[3].toUpperCase()} & HEX: ${args[2]}`);
                                                });
                                            } catch(e)
                                            {
                                                console.log(e.stack);
                                            }
                                        }
                                        else
                                        {
                                            return message.channel.send("Role already created!");
                                        }                          
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
            
            var $cList = [];

            $colors.forEach(async (data) => { 
                return $cList.push(message.member.guild.roles.find("name", data.role));
            });
            
            message.channel.send("Availible Colors are:\n\n" + 
                $cList.join(" ") + "\n\nTo join one, type: `!color <COLORNAME>` Example: `!color red`");
            break;
        default:
            message.channel.send("Invalid Command!");
            break;
    }
});

bot.login(TOKEN);