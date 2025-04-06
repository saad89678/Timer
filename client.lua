function OpenMenu()
    SendNUIMessage ({})
end
local visible = false
RegisterCommand('timer', function ()
    visible = not visible
    OpenMenu()
    if visible then
        SetNuiFocus(true, true)
    else
        SetNuiFocus(false, false)
    end
end)

RegisterNUICallback('closeUI', function (_, cb)
    visible = false
    cb({})
    SetNuiFocus(false, false)
end)
