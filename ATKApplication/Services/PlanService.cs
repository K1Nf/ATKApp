using ATKApplication.Contracts;
using ATKApplication.DataBase;
using ATKApplication.Models;
using CSharpFunctionalExtensions;
using Microsoft.EntityFrameworkCore;

namespace ATKApplication.Services
{
    public class PlanService(DataBaseContext _dB)
    {
        public async Task<Result<Plan>> Get(Guid Id)
        {
            var @event = await _dB.Plans
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == Id);

            if (@event == null)
            {
                return Result.Failure<Plan>("План не найден");
            }

            return @event;
        }


        public async Task<Result<List<Plan>>> GetAll()
        {
            var events = await _dB.Plans
                .AsNoTracking()
                .ToListAsync();

            return events;
        }


        public async Task<Result<Plan>> Create(Guid tokenId, CreatePlanRequest createPlanRequest)
        {
            var newPlan = Plan.Create(createPlanRequest.Name, tokenId, createPlanRequest.Year);

            if (newPlan != null)
            {
                await _dB.Plans.AddAsync(newPlan);
                await _dB.SaveChangesAsync();
                return Result.Success(newPlan);
            }

            return Result.Failure<Plan>("Не удалось создать план");
        }


        public async Task<Result> Update(Guid planId, Guid tokenId, UpdatePlanRequest updatePlanRequest)
        {
            int rows = await _dB.Plans
                .Where(x => x.Id == planId && x.OrganizationId == tokenId)
                    .ExecuteUpdateAsync(x => x
                        .SetProperty(p => p.Name, updatePlanRequest.Name)
                        .SetProperty(p => p.Status, updatePlanRequest.PlanStatus));

            if (rows == 1)
            {
                return Result.Success();
            }

            return Result.Failure("План не найден");
        }


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
