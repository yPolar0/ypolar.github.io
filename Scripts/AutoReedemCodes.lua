repeat task.wait() until game:IsLoaded()
repeat task.wait() until game.Workspace:FindFirstChild(game.Players.LocalPlayer.Name)

if game.PlaceId == 11765985382 then 
	game:GetService("ReplicatedStorage").RemoteEvent:FireServer()
end

local remoteEventPath = "Codes/RemoteEvent"
local remoteFunctionPath = "Codes/RemoteFunction"

local gameService = game:GetService("ReplicatedStorage")
local remoteEvent = gameService.Events:FindFirstChild(remoteEventPath)
local remoteFunction = gameService.Events:FindFirstChild(remoteFunctionPath)

if not remoteEvent or not remoteFunction then
    error("RemoteEvent or RemoteFunction not found")
    return
end

local function RedeemCodes()
    local Url = "https://progameguides.com/roblox/roblox-anime-fighting-simulator-x-codes/";
    local Response = game:HttpGet(Url);
    local Codes = {};

    for ul in string.gmatch(Response, "<ul>(.-)</ul>") do
        for li in string.gmatch(ul, "<li>(.-)</li>") do
            for Code in string.gmatch(li, "<strong>([^<]+)</strong>") do
                table.insert(Codes, Code);
            end
        end
    end

    for _, Code in next, Codes do
        local success, result = pcall(function()
            remoteEvent:FireServer("Redeem", Code)
        end)

        if success then
            print("Code redeemed:", Code)
        else
            warn("Error while redeeming code:", result)
        end
        
        wait(.8)
    end
end

function AutoExec()
    pcall(function()
        local exec = tostring(identifyexecutor())
        if exec == "Synapse X" then
            syn.queue_on_teleport("loadstring(game:HttpGet('https://ypolarwebsite.up.railway.app/AutoRedeemCodes.lua'))()")
        elseif exec ~= "Synapse X" then
            queue_on_teleport("loadstring(game:HttpGet('https://ypolarwebsite.up.railway.app/AutoRedeemCodes.lua'))()")
        end
    end)
end

RedeemCodes()
print("---------------")
