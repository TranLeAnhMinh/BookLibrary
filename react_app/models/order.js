class Order {
    constructor(
      id,
      userId,
      employeeCode,
      fullName,
      email,
      phoneNumber,
      provinceId,
      districtId,
      wardId,
      address,
      status,
      createdAt,
      updatedAt,
      deletedAt
    ) {
      this.id = id;
      this.userId = userId;
      this.employeeCode = employeeCode;
      this.fullName = fullName;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.provinceId = provinceId;
      this.districtId = districtId;
      this.wardId = wardId;
      this.address = address;
      this.status = status;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.deletedAt = deletedAt;
    }
  }
  
  export default Order;
  