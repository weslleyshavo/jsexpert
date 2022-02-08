const [nodePath, filePath, ...commands] = process.argv

function parseArguments(commands) {
    const cmd = new Map()
    const commandPreffix = '--'

    for (const key in commands) {
        const index = parseInt(key)
        const command = commands[key]
        if (!command.includes(commandPreffix)) continue;

        cmd.set(
            command.replace(commandPreffix, ''),
            commands[index + 1]
        )
    }

    return Object.fromEntries(cmd)
}

console.log(parseArguments(commands))