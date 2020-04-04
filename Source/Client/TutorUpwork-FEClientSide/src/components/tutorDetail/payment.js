/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal, InputNumber, Select } from 'antd';
import dateFormat from 'dateformat';
import Swal from 'sweetalert2';
import { payRequest, createContract } from './action';

const { Option } = Select;
const PaymentBox = props => {
  const { payModal, setPayModal, data, studentID, token } = props;
  const [totalhour, setTotalHour] = useState(1);
  const [skills, setSkills] = useState([]);
  const skillHandleChange = e => {
    console.log(e);
    setSkills(e);
  };
  const handleCloseClick = () => {
    setPayModal(false);
  };
  const done = () => {};
  const createContractDone = idContract => {
    payRequest(totalhour * data.price, 'NCB', idContract.id, token, done);
  };
  const handlePayClick = () => {
    const tutorId = data.id;
    const studentId = studentID;
    const beginTime = new Date();
    const endTime = `${new Date().getFullYear()}/12/31`;
    const pricePerHour = data.price;
    const totalHour = totalhour;
    const totalPrice = totalHour * pricePerHour;
    const status = 'Chưa thanh toán';
    const param = {
      tutorId,
      studentId,
      beginTime,
      endTime,
      pricePerHour,
      totalHour,
      totalPrice,
      status,
      skills,
    };
    console.log(skills);
    if (skills === undefined || skills.length === 0) {
      Swal.fire('Thông báo', 'Bạn chưa chọn kỹ năng', 'error');
      return;
    }
    if (totalPrice <= 5000 || totalPrice >= 1000000000) {
      Swal.fire(
        'Thông báo',
        'Số tiền giao dịch không hợp lệ. Số tiền hợp lệ từ 5,000 đến dưới 1 tỷ đồng',
        'error',
      );
      return;
    }
    createContract(param, token, createContractDone);
  };
  const onChange = e => {
    setTotalHour(e);
  };
  return (
    <div>
      {data ? (
        <Modal
          title="Thông tin thanh toán"
          centered
          visible={payModal}
          onCancel={handleCloseClick}
          onOk={handlePayClick}
        >
          <p>{`Giáo viên: ${data.name}`}</p>
          <p>{`Giới tính: ${data.gender}`}</p>
          <p>{`Ngày sinh: ${dateFormat(data.birthday, 'dd/mm/yyyy')}`}</p>
          <p>{`Địa chỉ: ${data.address.cityName.name} - ${data.address.disName.name}`}</p>

          <hr />
          <p>Số giờ thuê</p>
          <InputNumber
            style={{
              margin: '0px 20px 20px 20px',
            }}
            min={1}
            max={10}
            defaultValue={totalhour}
            onChange={onChange}
          />
          <p>Chọn kỹ năng</p>
          <Select
            style={{
              width: 200,
              borderRadius: '5px',
              height: '10px',
              margin: '0px 20px 20px 20px',
              paddingBottom: 50,
            }}
            mode="tags"
            onChange={skillHandleChange}
            tokenSeparators={[',']}
          >
            {data.skills.map(skill => (
              <Option key={skill}>{skill}</Option>
            ))}
          </Select>
          <p>{`Ngày thuê: ${dateFormat(new Date(), 'dd/mm/yyyy')}`}</p>
          <p>{`Ngày hết hạn: 31/12/${new Date().getFullYear()}`}</p>
          <p>{`Tổng số giờ thuê: ${totalhour}`}</p>
          <p>{`Giá/Giờ:  ${data.price} VND`}</p>
          <p>{`Thành tiền: ${totalhour * data.price} VND`}</p>
        </Modal>
      ) : (
        ''
      )}
    </div>
  );
};
export default PaymentBox;
