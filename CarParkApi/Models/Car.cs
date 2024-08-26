// Models/Car.cs
using System;
using System.ComponentModel.DataAnnotations;

namespace CarParkApi.Models
{
    public class Car
    {
        public int Id { get; set; }

        [Required]
        public string EmployeeName { get; set; }

        [Required]
        [RegularExpression(@"^[A-Z0-9]{1,7}$", ErrorMessage = "Invalid car registration number")]
        public string CarRegistrationNumber { get; set; }

        [Required]
        public string CarMake { get; set; }

        [Required]
        public string CarModel { get; set; }

        [Required]
        public string Colour { get; set; }

        [Required]
        public int Year { get; set; }

        public bool IsApproved { get; set; }
        public DateTime? DateApproved { get; set; }
    }
}
