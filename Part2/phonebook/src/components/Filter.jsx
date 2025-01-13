const Filter = ({condition, handleConditionChange}) => {
    return(
    <form>
        <div>
          filter shown with <input value={condition} onChange={handleConditionChange}/>
        </div>
    </form>
    )
}

export default Filter