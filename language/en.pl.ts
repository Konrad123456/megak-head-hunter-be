export const staticText = {
    errors: {
        SupportFilesCsvJson: 'Nie wspierany typ pliku. Wspieramy tylko CSV/JSON',
        InternalServerError: 'Wewnętrzny błąd serwera.',
    },
    validation: {
        user: {
          invalidToken: 'Invalid register token',
        },
        UserDoesntExist: 'Podany użytkownik nie istnieje.',
        WrongRegisterToken: 'Podany użytkownik nie istnieje.',
        AccessDenied: 'Dostęp zabroniony.',
        UnauthorizeAccess: 'Nieautoryzowany dostęp.',
        UserIsRegistered: 'Użytkownik już zarejestrowany.',
        WrongPassword: 'Niepoprawny login lub hasło.',
        EmailDoesntExist: 'Podany amail nie istnieje.',
        InvalidData: 'Niepoprawne dane.',
        password: {
            toShort: 'Hasło musi zawierać od 8 do 20 znaków. Hasło powinno zawierać małe i wielkie litery, cyfrę i znak specjalny.',
            confirmBeTheSame: 'Podane hasła muszą być takie same.',
        },
        Db: {
            DuplicateEntry: 'Zduplikowana wartość: ',
        }
    },
    notificationsTexts: {
        greetingText: 'Drogi użytkowniku,',
        yourTeam: 'Twój oddany zespół',
        ourTeamName: 'Team 10 MegaK',
    },
    emails: {
        titles: {
          registerAccount: 'Register Your Account',
        },
    },
    rolesName: {
        student: 'Student',
        hr: 'HR',
        admin: 'Admin',
    },
}