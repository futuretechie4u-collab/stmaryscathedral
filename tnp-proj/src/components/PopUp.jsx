import React from 'react'
import "../css/popup.css"
function PopUp(props) {
  return (props.trigger) ? (
    <div className='body'>
      <div class="popup">
        <form class="register-form"> 
    
          <div class="name-rows">
            <div class="input-group">
              <input type="text" name="firstname" required />
              <label>Gender</label>
            </div>
            <div class="input-group">
              <input type="text" name="lastname" required />
              <label>Relation</label>
            </div>
            <div class="input-group">
              <input type="text" name="lastname" required />
              <label>Date of Birth</label>
            </div>
            <div class="input-group">
              <input type="text" name="lastname" required />
              <label>Occupation</label>
            </div>
            <div class="input-group">
              <input type="number" name="lastname" required />
              <label>Phone number</label>
            </div>
            <div class="input-group">
              <input type="email" name="lastname" required />
              <label>Email ID</label>
            </div>
            <div class="input-group">
              <input type="text" name="lastname" required />
              <label>BLOOD GROUP</label>
            </div>
            <div class="input-group">
              <input type="number" name="lastname" required />
              <label>Adhaar Number</label>
            </div>
          </div>
    
         
    
        
    
          <button type="submit" class="submit-btn" onClick={() => props.setTrigger(false)}>ADD MEMBER</button> 
        </form> 
      </div>
      </div>
  ) : "";
}

export default PopUp
