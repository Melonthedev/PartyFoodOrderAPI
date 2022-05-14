using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace PartyFoodOrderAPI
{

    public class SMSHelper
    {


        public static void SendSMS(string phoneNumber, string message)
        {
            var accountSid = "AC230c1f13850c9a9a845baef0e88efe14";
            var authToken = "a4b78fbb1b6c2918a4eb216d93eee0ea";

            TwilioClient.Init(accountSid, authToken);

            var to = new PhoneNumber(phoneNumber);
            var messageToSend = MessageResource.Create(
                to,
                from: new PhoneNumber("+18433511298"),
                body: message);
            
            Console.WriteLine(messageToSend.Sid);
            
        }
    }
}
