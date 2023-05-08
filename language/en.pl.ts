export const staticText = {
    errors: {
        SupportFilesCsvJson: 'Nie wspierany typ pliku. Wspieramy tylko CSV/JSON.',
        InternalServerError: 'Wewnętrzny błąd serwera.',
    },
    validation: {
        user: {
          invalidToken: 'Invalid register token.',
        },
        AccessDenied: 'Dostęp zabroniony.',
        DoValueIsWrong: 'Wartość `do` nie może być mniejsza niż wartość `od`.',
        EmailDoesntExist: 'Podany email nie istnieje.',
        InvalidData: 'Niepoprawne dane.',
        UnauthorizeAccess: 'Nieautoryzowany dostęp.',
        UnconfirmedAccount: 'Konto nie zostało potwierdzone.',
        UserDoesntExist: 'Podany użytkownik nie istnieje.',
        UserIsRegistered: 'Użytkownik już zarejestrowany.',
        ValuesGreaterThanZero: 'Podane wartości muszą być większe od zera.',
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
        }
    }
}