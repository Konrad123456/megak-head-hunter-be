export const staticText = {
    errors: {
        SupportFilesCsvJson: 'Nie wspierany typ pliku. Wspieramy tylko CSV/JSON',
        InternalServerError: 'Wewnętrzny błąd serwera.',
        SendEmailError: 'Nie udało się wysłać emaila pod adres ',
    },
    validation: {
        user: {
          invalidToken: 'Invalid register token.',
        },
        UserDoesntExist: 'Podany użytkownik nie istnieje.',
        WrongRegisterToken: 'Podany użytkownik nie istnieje.',
        AccessDenied: 'Dostęp zabroniony.',
        EmailDoesntExist: 'Podany email nie istnieje.',
        InvalidData: 'Niepoprawne dane.',
        UnauthorizeAccess: 'Nieautoryzowany dostęp.',
        UnconfirmedAccount: 'Konto nie zostało potwierdzone.',
        UserIsRegistered: 'Użytkownik już zarejestrowany.',
        WrongPassword: 'Niepoprawny login lub hasło.',
        password: {
            toShort: 'Hasło musi zawierać od 8 do 20 znaków. Hasło powinno zawierać małe i wielkie litery, cyfrę i znak specjalny.',
            confirmBeTheSame: 'Podane hasła muszą być takie same.',
        },
        message: {
            DataHasBeenSaved: 'Dane zostały zapisane.',
            DataConfirmed: 'Dane potwierdzone.',
            PasswordChanged: 'Hasło zmienione.',
            StudentWasHired: 'Kursant zatrudniony.',
            StudentReserved: 'Kursant zarezerwowany.',
            Success: 'Sukces.',
        },
        Db: {
            DuplicateEntry: 'Zduplikowana wartość: ',
        },
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