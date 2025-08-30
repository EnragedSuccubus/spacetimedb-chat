namespace StdbModule;

public static partial class Module
{

    /// <summary>
    /// Validates a name is not empty.
    /// @TODO - Add more validation.
    /// </summary>
    /// <param name="name"></param>
    /// <returns></returns>
    /// <exception cref="ArgumentException"></exception>
    private static string ValidateName(string name)
    {
        if (string.IsNullOrEmpty(name))
        {
            throw new ArgumentException("Names must not be empty");
        }

        return name;
    }

    /// <summary>
    /// Validates that the message is not empty.
    /// @TODO - Add more validation.
    /// </summary>
    /// <param name="text"></param>
    /// <returns></returns>
    /// <exception cref="ArgumentException"></exception>
    private static string ValidateMessage(string text)
    {
        if (string.IsNullOrEmpty(text))
        {
            throw new ArgumentException("Messages must not be empty");
        }
        
        return text;
    }
}