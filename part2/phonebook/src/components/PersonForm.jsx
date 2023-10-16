const PersonForm = ({handlePhone,newName,handleName,phoneNumber,handleNumber}) => {
    return(
        <form onSubmit={handlePhone}>
            <div>
              name: <input value={newName} onChange={handleName} required/>
            </div>
            <div>
              number: <input value={phoneNumber} onChange={handleNumber} required/>
            </div>
            <div>
              <button type="submit">add</button>
            </div>
        </form>
    );
}

export default PersonForm;