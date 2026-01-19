import React from 'react'
import "../css/signin.css"

const SignIn = () => {
  return (
<section class="add-card page">
  <form class="form">
    <label for="name" class="label">
      <span class="title">USER NAME</span>
      <input
        class="input-field"
        type="text"
        name="input-name"
        title="Input title"
        placeholder="User Name"
      />
    </label>
    <label for="serialCardNumber" class="label">
      <span class="title">PASSWORD</span>
      <input
        id="serialCardNumber"
        class="input-field"
        type="password"
        name="input-name"
        title="Input title"
        placeholder="password"
      />
    </label>
 
    <input class="checkout-btn" type="button" value="SIGN IN" />
  </form>
</section>
  )
}

export default SignIn
