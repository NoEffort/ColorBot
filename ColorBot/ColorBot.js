const botSettings = require("./settings.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

const fs = require("fs");
var contents = fs.readFileSync("colors.json");

//Grabbing $colors array to be used in turn with colors.json
var $colors = [];
$colors = JSON.parse(contents);

//Is used in a later function. Keep in mind.
bot.colors = require("./colors.json");

//Gets token and prefix from settings.json
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
    
    //These will be removed in due time 39-44
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
                //Possibly run the $colors array to get commands automatically?
                //Add a new section to colors.json to allow the case names to be defined.
                switch(args[1].toLowerCase())
                {

                    //This stuff will be removed later 58-81
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
                        //Looks for permission(s)
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
                                        /*
                                        This portion of code must be looked at later.
                                        PROBLEM:
                                            When attempting to run the code, the role is successfully created on the server,
                                            but when it attempts to change colors.json, the program will restart.
                                        I am using NODEMON, and I do have a nodemon.json in place that should prevent this,
                                        yet nothing seems to work.
                                        
                                        Ideas, Ethan?
                                        */
                                        
                                        //Defines a role class to find the created role
                                        let role = message.member.guild.roles.find(r => r.name === args[3]);
                                        if(!role)
                                        {
                                            //If the role does not exist, it will attempt to make one.
                                            //It does this successfully every time.
                                            try
                                            {
                                                role = await message.guild.createRole({
                                                    name: args[3].toUpperCase(),
                                                    color: args[2] 
                                                });

                                                /*
                                                At this point, I'm attempting to array role through bot.colors to define what
                                                needs to be added to colors.json [role & hex]
                                                */
                                                bot.colors[role] = 
                                                {
                                                    role: args[3].toUpperCase(),
                                                    hex: args[2]
                                                }
                                                
                                                //I think the problem is here. Once it tries to write the info, it restarts
                                                //I have no idea why - and it shows no error, but the object does not write
                                                fs.writeFileSync("colors.json", JSON.stringify(bot.colors, null, 4), err =>
                                                {
                                                    if(err) throw err;
                                                    message.channel.send(`Role Created | NAME: ${args[3].toUpperCase()} & HEX: ${args[2]}`);
                                                });
                                            } catch(e)
                                            {
                                                //Error catching
                                                console.log(e.stack);
                                            }
                                        }
                                        //The rest of the else statements, not too special
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

            //Gets all colors defined in colors.json to use them in $cList array
            $colors.forEach(async (data) => { 
                return $cList.push(message.member.guild.roles.find("name", data.role));
            });
            
            //$cList array prints all availible colors in the chat
            message.channel.send("Availible Colors are:\n\n" + 
                $cList.join(" ") + "\n\nTo join one, type: `!color <COLORNAME>` Example: `!color red`");
            break;
        default:
            message.channel.send("Invalid Command!");
            break;
    }
});

//Bot logs into the server
bot.login(TOKEN);
