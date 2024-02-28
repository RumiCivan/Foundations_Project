const mockedTicketAdd = jest.fn((ticket) => ticket);
const mockedGetTickets = jest.fn((props) => [
  {
    status: STATUS,
    timestamp: TIMESTAMP1,
    amount: AMOUNT,
    submitter: UN1,
    description: DESCRIPTION,
    type: TYPE,
  },
]);
const mockedSetTicketStatus = jest.fn((props) => {
  if (props.timestamp === TIMESTAMP1) {
    return { ...TICKET_OBJ };
  } else {
    throw new Error(ERROR_MESS);
  }
});

jest.mock("../../src/daos/ticketDao", () => ({
  add: mockedTicketAdd,
  getTickets: mockedGetTickets,
  setTicketStatus: mockedSetTicketStatus,
}));

const ticketService = require("../../src/service/ticketService");

//-----------------
describe("processTicket", () => {
    test(
      "Giving valid username, role, submitter, timestamp, and status attributes should pass in the correct " +
        "submitter, timestamp, status, and resolver props to the DAO and return an unmodified ticket object.",
      async () => {
        const PROCESS_TICKET_INFO = {
          username: UN2,
          role: ROLE2,
          submitter: UN1,
          timestamp: TIMESTAMP1,
          status: STATUS2,
        };
        const EXPECTED_PROPS_TO_DAO = {
          submitter: UN1,
          timestamp: TIMESTAMP1,
          status: STATUS2,
          resolver: UN2,
        };
        const EXPECTED_RESULT = { ...TICKET_OBJ };
  
        const RESULT = await ticketService.processTicket(PROCESS_TICKET_INFO);
  
        expect(RESULT).toStrictEqual(EXPECTED_RESULT);
        expect(mockedSetTicketStatus).toHaveBeenCalledTimes(1);
        expect(mockedSetTicketStatus).toHaveBeenCalledWith(EXPECTED_PROPS_TO_DAO);
      }
    );
  });