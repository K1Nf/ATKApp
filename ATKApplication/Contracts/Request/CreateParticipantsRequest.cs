namespace ATKApplication.Contracts.Request
{
    public record CreateParticipantsRequest();

    public class CategoryInfoRequest
    {
        public int Id { get; set; }
        public Categories Category { get; set; } // if selected
        public string Name { get; set; } = null!; // if custom
        public int Count { get; set; }
    }

    public enum Categories 
    {

        schoolkids = 1,
        students = 2,
        migrantsStudents = 3,
    }
}