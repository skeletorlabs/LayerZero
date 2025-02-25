import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'
import { OAppEnforcedOption, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'
import { EndpointId } from '@layerzerolabs/lz-definitions'
import { generateConnectionsConfig } from '@layerzerolabs/metadata-tools'

const fantomContract: OmniPointHardhat = {
    eid: EndpointId.FANTOM_V2_MAINNET,
    contractName: 'MyOFTAdapter',
}

const sonicContract: OmniPointHardhat = {
    eid: EndpointId.SONIC_V2_MAINNET,
    contractName: 'OneRing',
}

const EVM_ENFORCED_OPTIONS: OAppEnforcedOption[] = [
    {
        msgType: 1,
        optionType: ExecutorOptionType.LZ_RECEIVE,
        gas: 80000,
        value: 0,
    },
    {
        msgType: 2,
        optionType: ExecutorOptionType.LZ_RECEIVE,
        gas: 80000,
        value: 0,
    },
    {
        msgType: 2,
        optionType: ExecutorOptionType.COMPOSE,
        index: 0,
        gas: 80000,
        value: 0,
    },
]

export default async function () {
    const connections = await generateConnectionsConfig([
        [
            fantomContract, // srcContract
            sonicContract, // dstContract
            [['Horizen', 'Nethermind'], []], // [ requiredDVN[], [ optionalDVN[], threshold ] ]
            [5, 20], // [srcToDstConfirmations, dstToSrcConfirmations]
            [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // [enforcedOptionsSrcToDst, enforcedOptionsDstToSrc]
        ],
    ])

    return {
        contracts: [{ contract: fantomContract }, { contract: sonicContract }],
        connections,
    }
}
