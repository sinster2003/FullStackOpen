const Persons = ({personsToShow, handleDelete}) => {

    const eventDelete = (id, name) => {
        if(window.confirm(`Delete ${name}?`)) {
            handleDelete(id);
        }
    }

    return(
        <div>
            {
                personsToShow.map(person => {
                    return (
                        <div key={person.id}>
                            <p style={{display: "inline-block"}}>{person.name} {person.phone}</p>
                            <button onClick={() => eventDelete(person.id,person.name)}>delete</button>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Persons;