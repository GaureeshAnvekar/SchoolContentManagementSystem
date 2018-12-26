using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class FeesEntity
    {
        public int Id { get; set; }
        public int FeeTypeId { get; set; }
        public decimal FeeDiscountAmount { get; set; }
        public decimal FeeFineAmount { get; set; }
        public int PaymentModeId { get; set; }
        public decimal ReceivedAmount { get; set; }
        public DateTime ReceivedDate { get; set; }
        public string ReceivedBy { get; set; }
        public int SchoolId { get; set; }
        public int StandardId { get; set; }
        public string CustomerId { get; set; }
        public bool IsSuccess { get; set; }
        public string TransactionReferenceNo { get; set; }
        public string BankReferenceNo { get; set; }
        public int StudentId { get; set; }
        public string MoneyReceiptNo { get; set; }
        public bool IsFullPayment { get; set; }
        public decimal BalanceRemaining { get; set; }
        public DateTime RemainingBalancePayDate { get; set; }
        public int FeeValidUptoDate { get; set; }
        public int FeeValidUptoMonth { get; set; }
        public int FeeValidUptoYear { get; set; }
    }
}
