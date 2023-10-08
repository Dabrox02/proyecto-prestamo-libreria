export const swalAlert = ({ type, title, time, btnConfirm }) => {
    return Swal.fire({
        icon: type,
        title: title,
        showConfirmButton: btnConfirm ? btnConfirm : false,
        timer: time ? time : 2000
    })
}