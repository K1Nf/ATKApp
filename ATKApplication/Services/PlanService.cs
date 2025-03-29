using ATKApplication.Contracts.Request;
using ATKApplication.DataBase;
using ATKApplication.Models;
using CSharpFunctionalExtensions;
using Microsoft.EntityFrameworkCore;

namespace ATKApplication.Services
{
    public class PlanService(DataBaseContext _dB)
    {
        //public async Task<Result<Plan>> Get(Guid OrganizerId)
        //{
        //    var plan = await _dB.Plans
        //        .AsNoTracking()
        //        .FirstOrDefaultAsync(e => e.OrganizationId == OrganizerId);
        //
        //    if (plan == null)
        //    {
        //        return Result.Failure<Plan>("План не найден");
        //    }
        //
        //    return plan;
        //}


        public async Task<Result<List<Plan>>> GetAll(Guid userId)
        {
            var plans = await _dB.Plans
                .Where(x => x.OrganizationId == userId)
                .Include(x => x.Organization)
                .AsNoTracking()
                .ToListAsync();

            return plans;
        }


        public async Task<Result> Create(Guid tokenId)
        {
            List<Plan> eventsInPlan = await _dB.Events
                .Where(x => x.OrganizerId == tokenId && x.IsSystematic == true)
                .Select(x => new Plan
                {
                    Id = x.Id,
                    Name = x.Name,
                    Year = x.Date.Year,
                    OrganizationId = x.OrganizerId
                })
                .ToListAsync();

            await _dB.Plans                                     // Упростить обновление мероприятий в плане
                .Where(p => p.OrganizationId == tokenId)        // Сделать обновление за один запрос
                .ExecuteDeleteAsync();                          // Вместо удаления и добавления
                                                                // Сделать, чтобы добавлялись новые, 
                                                                // а существующие игнорировались или обновлялись
            await _dB.Plans.AddRangeAsync(eventsInPlan);        //
            await _dB.SaveChangesAsync();
            return Result.Success();
        }


        //public async Task<Result> Update(Guid planId, Guid tokenId, UpdatePlanRequest updatePlanRequest)
        //{
        //    int rows = await _dB.Plans
        //        .Where(x => x.Id == planId && x.OrganizationId == tokenId)
        //            .ExecuteUpdateAsync(x => x
        //                .SetProperty(p => p.Name, updatePlanRequest.Name)
        //                .SetProperty(p => p.Status, updatePlanRequest.PlanStatus));

        //    if (rows == 1)
        //    {
        //        return Result.Success();
        //    }

        //    return Result.Failure("План не найден");
        //}


        public async Task<Result> Delete(Guid planId)
        {
            // transaction???
            int deletedPlansCount = await _dB.Plans
                .Where(x => x.Id == planId)
                .ExecuteDeleteAsync();
            
            if (deletedPlansCount == 1)
            {
                return Result.Success();
            }

            return Result.Failure("Что-то пошло не так!");
        }
    }
}
