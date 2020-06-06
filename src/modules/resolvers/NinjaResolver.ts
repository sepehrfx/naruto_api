import { Resolver, Query, FieldResolver, Root, ID } from 'type-graphql';
import { Ninja } from '../../entity/Ninja';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { NinjaAttrRepo } from '../../repos/NinjaAttrRepo';
import { NinjaAttr } from '../../entity/NinjaAttr';
import { NinjaRepo } from '../../repos/NinjaRepo';
import { Tools } from '../../entity/Tools';
import { ToolsRepo } from '../../repos/ToolsRepo';
import { Family } from '../../entity/Family';
import { FamilyRepo } from '../../repos/FamilyRepo';

@Resolver(Ninja)
export class NinjaResolver {
	@InjectRepository(NinjaRepo)
	private readonly ninjaRepo: NinjaRepo;

	@InjectRepository(ToolsRepo)
	private readonly toolsRepo: ToolsRepo;

	@InjectRepository(FamilyRepo)
	private readonly familyRepo: FamilyRepo;

	@InjectRepository(NinjaAttrRepo)
	private readonly ninjaAttrRepo: NinjaAttrRepo;

	@Query(() => [Ninja])
	async ninjas(): Promise<Ninja[]> {
		return await this.ninjaRepo.find({ relations: ['clan'] });
	}

	@FieldResolver(() => Tools)
	async tools(@Root() ninja: Ninja): Promise<Tools[]> {
		const tools = await this.toolsRepo
			.createQueryBuilder('tool')
			.innerJoinAndSelect('tool.ninja_tools', 'ninja_tools')
			.where('ninja_tools.ninja = :id', { id: ninja.id })
			.getMany();

		return tools;
	}

	@FieldResolver(() => Family)
	async family(@Root() ninja: Ninja) {
		const family = await this.familyRepo
			.createQueryBuilder('family')
			.innerJoinAndSelect('family.parent_to', 'parent_to')
			.where('parent_from = :id', { id: ninja.id })
			.getMany();
		return family;
	}

	@FieldResolver(() => NinjaAttr)
	async ninja_attributes(@Root() ninja: Ninja): Promise<NinjaAttr[]> {
		const ninjaAttr = await this.ninjaAttrRepo.find({
			where: { ninja: ninja.id },
			relations: ['season']
		});

		return ninjaAttr;
	}
}
