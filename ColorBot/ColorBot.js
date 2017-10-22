const botSettings = require("./settings.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

const PREFIX = botSettings.prefix;
const TOKEN = botSettings.token;

bot.on("ready", () =>
{
    console.log(`Bot is ready! ${bot.user.username}`);
});

bot.on("message", async message =>
{
    if(message.author.bot) return;
    if(!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    //WHAT I WOULD LIKE TO HAVE DONE:
    //The roles (find(name, role)) will be set in a .json file (colors.json)
    //These will all be under a new variable:
        //var getColors = message.member.guild.roles.find("name", $colors);
    //This can also be utilized as a function type thing:
        //getColors.<COLORNAME>; COLORNAME will be defined in a .json file (colors.json)
        //getColors.<COLORHEX>; COLORHEX will be defined in a .json file (colors.json)
    //Colors can be added to the .json file (colors.json), and will be registered
    //New Roles will also be created if they do not exist already, and are listed in a .json file (colors.json):
        //message.guild.roles.find(r => r.name === "<COLORNAME>") = 
        //await message.guild.createRole({ name:"<COLORNAME>", color:"<COLORHEX>", permissions: [] });

    colorRed = message.member.guild.roles.find("name", "#RED");
    colorOrange = message.member.guild.roles.find("name", "#ORANGE");
    colorYellow = message.member.guild.roles.find("name", "#YELLOW");
    colorGreen = message.member.guild.roles.find("name", "#GREEN");
    colorBlue = message.member.guild.roles.find("name", "#BLUE");
    colorPurple = message.member.guild.roles.find("name", "#PURPLE");

    //This will be moved into a .json file (colors.json)
    //This will also be expandable by syncing it with a .json file (colors.json)

    var $colors = [colorRed, colorOrange, colorYellow, colorGreen, colorBlue, colorPurple]

    switch(args[0].toLowerCase())
    {
        case "color":
            if(args[1])
            {
                switch(args[1].toLowerCase())
                {
                    //I would like this part to be automated via an ArrayList ($colors)
                    //The ArrayList could be interactive with a .json file (colors.json)

                    case "red":
                        message.member.addRole(colorRed);
                        message.reply("Color changed to: " + colorRed);
                        break;
                    case "orange":
                        message.member.addRole(colorOrange);
                        message.reply("Color changed to: " + colorOrange);
                        break;
                    case "yellow":
                        message.member.addRole(colorYellow);
                        message.reply("Color changed to: " + colorYellow);
                        break;
                    case "green":
                        message.member.addRole(colorGreen);
                        message.reply("Color changed to: " + colorGreen);
                        break;
                    case "blue":
                        message.member.addRole(colorBlue);
                        message.reply("Color changed to: " + colorBlue);
                        break;
                    case "purple":
                        message.member.addRole(colorPurple);
                        message.reply("Color changed to: " + colorPurple);
                        break;
                    default:
                        message.reply("Unkown Color!");
                        break;
                }
            }
            else
            {
                message.reply("Please specify a color. Use `!colors`");
            }
            break;
        case "colors":

            //This will be listed in chat via a for loop with an ArrayList ($colors)

            message.channel.send("Availible Colors are:\n\n" + 
            colorRed + " " + colorOrange + " " + colorYellow + " " + colorGreen + " " + colorBlue + " " + colorPurple + " " +
            "\n\nTo join one, type: `!color <COLORNAME>` Example: `!color red`");
            break;
        default:
            message.channel.send("Invalid Command!");
            break;
    }
});

bot.login(TOKEN);