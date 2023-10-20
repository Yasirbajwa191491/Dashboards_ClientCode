import axios from 'axios';

const RESIDENT_API_BASE_URL = 'http://localhost:8083/residents';

class ResidentService {
  registerResident(residentDTO) {
    return axios.post(`/register`, residentDTO);
  }

  sendForgotPasswordEmail(email) {
    return axios.post(`/forgot_password`, { email });
  }

  updateResident(rId, residentDTO) {
    return axios.put(`/update-resident-detail/${rId}`, residentDTO);
  }

  getAllResidents() {
    return axios.get(`/view-all-resident`);
  }

  //look into this method, how key is passed in url..see if its working or not 
  getMyProfile(key) {
    return axios.get(`/view-my-profile?key=${key}`);
  }

  //complaint
  registerComplaint(key, complaintDTO) {
    return axios.post(`/register_complaint`, complaintDTO);
  }

  updateComplaint(key, cid, complaintDTO) {
    return axios.put(`/update_complaint/${cid}`, complaintDTO);
  }

  deleteComplaint(key, cid) {
    return axios.delete(`/delete_complaint/${cid}`);
  }

  getAllComplaints(key) {
    return axios.get(`/view_all_complaints`);
  }

  getComplaintRepliesForResident(key) {
    return axios.get(`/view_complaint_reply`);
  }

//suggestion
  registerSuggestion(key, suggestionDTO) {
    return axios.post(`/register_suggestion`, suggestionDTO);
  }

  updateSuggestion(key, sid, suggestionDTO) {
    return axios.put(`/update_suggestion/${sid}`, suggestionDTO);
  }

  deleteSuggestion(key, sid) {
    return axios.delete(`/delete_suggestion/${sid}`);
  }

  getAllSuggestions(key) {
    return axios.get(`/view_all_suggestions`);
  }

  getSuggestionRepliesForResident(key) {
    return axios.get(`/view_suggestion_reply`);
  }
  
  // Event Scheduling
  checkEventAvailability(key, eventAvailability) {
    return axios.post(`/check-schedule-availability`, eventAvailability);
  }

  getBookedSlots(key) {
    return axios.get(`/view-booked-slots`);
  }

  scheduleEvent(key, eventDTO) {
    return axios.post(`/schedule_event`, eventDTO);
  }

  updateEvent(eventId, key, eventDTO) {
    return axios.put(`/update_event/${eventId}`, eventDTO);
  }

  deleteEvent(eventId, key) {
    return axios.delete(`/delete_event/${eventId}`);
  }

  viewScheduledEvents(key) {
    return axios.get(`/view_scheduled_event`);
  }

  markEventAsPaid(eventId, paymentRequest, key) {
    return axios.post(`/mark-as-paid/${eventId}`, paymentRequest);
  }

  // Accounting
  getMyBills(key) {
    return axios.get(`/view-my-bill`);
  }

  getMyPreviousBills(key) {
    return axios.get(`/view-my-previous-bill`);
  }

  makeOnlinePayment(key, billNo, paymentRequest) {
    return axios.post(`/make-online-payment/${billNo}`, paymentRequest);
  }

}

export default new ResidentService();
