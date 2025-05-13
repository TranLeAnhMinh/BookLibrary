class User {
    constructor(
      id,
      email,
      password,
      fullName,
      phoneNumber,
      gender,
      birthDate,
      provinceId,
      districtId,
      wardId,
      address,
      googleId,
      role,
      status,
      createdAt,
      updatedAt,
      deletedAt
    ) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.fullName = fullName;
      this.phoneNumber = phoneNumber;
      this.gender = gender;
      this.birthDate = birthDate;
      this.provinceId = provinceId;
      this.districtId = districtId;
      this.wardId = wardId;
      this.address = address;
      this.googleId = googleId;
      this.role = role;  // 0 = Admin, 1 = User
      this.status = status;  // active or inactive
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.deletedAt = deletedAt;
    }
  }
  
  export default User;
  