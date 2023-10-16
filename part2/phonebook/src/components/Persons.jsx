const Persons = ({personsToShow}) => {
    return(
        <div>
            {
                personsToShow.map(person => <p key={person.id}>{person.name} {person.phone}</p>)
            }
        </div>
    );
}

export default Persons;