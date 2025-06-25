using System.Runtime.Serialization;

namespace ATKApplication.Contracts.Request
{
    public record CreateInterAgencyCooperationRequest(Dictionary<string, SelectedOrganizations> SelectedOrganizations, 
                                                        List<CustomOrganizations> CustomOrganizations);

    public class SelectedOrganizations
    {
        public string Role { get; set; }
        public string Description { get; set; }
    }


    public class CustomOrganizations
    {
        public string Name { get; set; }
        public string Role { get; set; }
        public string Description { get; set; }
    }
}